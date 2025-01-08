import express from 'express';
import { createBook } from '../controllers/books.controller';
import multer from 'multer';
import path from 'node:path';

const upload = multer({
  dest: path.resolve(__dirname, '../../public/data/uploads'),
  limits: {
    fieldSize: 3e7,
  },
});
export const booksRouter = express.Router();

booksRouter.route('/create').post(
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'file', maxCount: 1 },
  ]),
  createBook
);
