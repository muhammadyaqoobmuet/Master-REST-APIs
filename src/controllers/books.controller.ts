import express, { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import User from '../models/user.models';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { config } from '../config/config';
import path from 'node:path';
import cloudinary from '../config/cloudnary';

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, author, genre } = req.body;

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
    console.log(uploadResultofCoverImage);
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
    




    console.log(uploadFilePdfResults);
  } catch (error) {
    next(createHttpError(400, `${error}`));
  }

 

 
 

  res.json({});
};
