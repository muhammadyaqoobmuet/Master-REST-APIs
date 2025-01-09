import express, { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import User from '../models/user.models';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { config } from '../config/config';
import path from 'node:path';
import cloudinary from '../config/cloudnary';
import Book from '../models/book.models';
import fs from 'node:fs';
import {
  authenticateMiddleware,
  AuthRequest,
} from '../middleware/authenticate';
import { StringSchemaDefinition } from 'mongoose';

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, genre } = req.body;

  if (!title || !genre) {
    return next(createHttpError(400, 'title, genre are required'));
  }
  const files = req.files as { [filename: string]: Express.Multer.File[] };

  let coverImageMimeType;
  let coverImageFileName;
  let coverImageFilePath;

  let fileMimeType;
  let fileName;
  let filePath;

  if (files.coverImage && files.coverImage.length > 0) {
    coverImageMimeType = files.coverImage[0].mimetype.split('/')[1];
    coverImageFileName = files.coverImage[0].filename;
    coverImageFilePath = path.resolve(
      __dirname,
      '../../public/data/uploads',
      coverImageFileName
    );

    console.log(coverImageMimeType);
  } else {
    next(createHttpError(400, 'cover Image is required'));
  }

  if (files.file && files.file.length > 0) {
    fileMimeType = files.file[0].mimetype.split('/')[1];
    fileName = files.file[0].filename;
    filePath = path.resolve(__dirname, '../../public/data/uploads', fileName);
  } else {
    next(createHttpError(400, 'pdf file is required'));
  }

  try {
    // uploading image
    const uploadResultofCoverImage = await cloudinary.uploader.upload(
      coverImageFilePath as string,
      {
        filename_override: coverImageFileName,
        folder: 'book-covers',
        format: coverImageMimeType,
      }
    );

    // upload file
    const uploadFilePdfResults = await cloudinary.uploader.upload(
      filePath as string,
      {
        filename_override: fileName,
        folder: 'books',
        format: 'pdf',
        resource_type: 'raw',
      }
    );

    // updating db
    const _req = req as AuthRequest; // type cast
    const newBook = await Book.create({
      title,
      author: _req.userId,
      genre,
      coverImage: uploadResultofCoverImage.secure_url,
      file: uploadFilePdfResults.secure_url,
    });

    // delete files

    await fs.promises.unlink(filePath as string);
    await fs.promises.unlink(coverImageFilePath as string);

    res.status(201).json({
      id: newBook._id,
      message: 'book uploaded',
    });
  } catch (error) {
    next(createHttpError(400, `${error}`));
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, genre } = req.body;
    const { id } = req.params;

    // Check if the book exists
    const book = await Book.findById(id);

    if (!book) {
      return next(createHttpError(404, 'Book not found'));
    }

    const _req = req as AuthRequest; // Type casting to access userId

    // Check if the logged-in user is the author of the book
    if (book.author.toString() !== _req.userId) {
      return next(
        createHttpError(403, 'Access denied: You cannot edit this book')
      );
    }

    const files = req.files as { [filename: string]: Express.Multer.File[] };

    let updatedCoverImage = book.coverImage;
    let updatedFile = book.file;

    // Handle new cover image upload
    if (files?.coverImage) {
      const coverImageFileName = files.coverImage[0].filename;
      const coverImageMimeType = files.coverImage[0].mimetype.split('/')[1];
      const coverImagePath = path.resolve(
        __dirname,
        '../../public/data/uploads',
        coverImageFileName
      );

      const uploadCoverImageResult = await cloudinary.uploader.upload(
        coverImagePath,
        {
          filename_override: coverImageFileName,
          folder: 'book-covers',
          format: coverImageMimeType,
        }
      );

      updatedCoverImage = uploadCoverImageResult.secure_url;
      await fs.promises.unlink(coverImagePath);
    }

    // Handle new book file upload
    if (files?.file) {
      const bookFileName = files.file[0].filename;
      const bookFilePath = path.resolve(
        __dirname,
        '../../public/data/uploads',
        bookFileName
      );

      const uploadFileResult = await cloudinary.uploader.upload(bookFilePath, {
        resource_type: 'raw',
        folder: 'books',
        filename_override: bookFileName,
      });

      updatedFile = uploadFileResult.secure_url;
      await fs.promises.unlink(bookFilePath);
    }

    // Update the book in the database
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        title: title || book.title,
        genre: genre || book.genre,
        coverImage: updatedCoverImage,
        file: updatedFile,
      },
      { new: true } // Return the updated document
    );

    res.status(200).json({
      message: 'Book updated successfully',
      book: updatedBook,
    });
  } catch (error) {
    next(createHttpError(500, `An error occurred: ${error}`));
  }
};

// making it public
export const getBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page = 1, limit = 10 } = req.query;

  // Convert to integers and handle default values
  const pageNumber = parseInt(page as string) || 1;
  const pageLimit = parseInt(limit as string) || 10;

  // Calculate the number of documents to skip
  const skip = (pageNumber - 1) * pageLimit;

  try {
    // Fetch books with pagination
    const books = await Book.find().skip(skip).limit(pageLimit);

    // Get the total number of books
    const totalBooks = await Book.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(totalBooks / pageLimit);

    res.status(200).json({
      totalBooks,
      totalPages,
      currentPage: pageNumber,
      books,
    });
  } catch (error) {
    next(createHttpError(500, `Error fetching books: ${error}`));
  }
};
