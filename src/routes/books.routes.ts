import express from 'express';
import { createBook } from '../controllers/books.controller';


export const booksRouter = express.Router();

booksRouter.route('/create').post(createBook);


