import express from 'express';
import { createBook, updateBook } from '../controllers/books.controller';
import multer from 'multer';
import path from 'node:path';
import { authenticateMiddleware } from '../middleware/authenticate';

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../public/data/uploads')); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Save file with a timestamp for uniqueness
  },
});

// Multer file filter for validating file types
const fileFilter = (
  req: express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.fieldname === 'coverImage') {
    // Allow image files for `coverImage`
    if (['image/png', 'image/jpeg', 'image/jpg'].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          'Only image files (PNG, JPEG, JPG) are allowed for coverImage!'
        ) as unknown as null,
        false
      );
    }
  } else if (file.fieldname === 'file') {
    // Allow only PDF files for `file`
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(
        new Error(
          'Only PDF files are allowed for the file field!'
        ) as unknown as null,
        false
      );
    }
  } else {
    cb(new Error('Invalid field name!') as unknown as null, false);
  }
};

// Configure Multer with storage, fileFilter, and size limits
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 30 * 1024 * 1024, // 30 MB limit
  },
});

export const booksRouter = express.Router();

// Route configuration
booksRouter.route('/create').post(
  authenticateMiddleware,
  upload.fields([
    { name: 'coverImage', maxCount: 1 }, // Accept one image file for coverImage
    { name: 'file', maxCount: 1 }, // Accept one PDF file for file
  ]),
  createBook
);

booksRouter.route('/update/:id').patch(
  authenticateMiddleware,
  upload.fields([
    { name: 'coverImage', maxCount: 1 }, // Accept one image file for coverImage
    { name: 'file', maxCount: 1 }, // Accept one PDF file for file
  ]),
  updateBook
);

