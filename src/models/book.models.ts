import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from './user.models';
// Interface for TypeScript
interface IBooks extends Document {
  _id: string;
  title: string;
  author: IUser;
  genre: string;
  coverImage: string;
  file: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define Schema
const bookSchema: Schema<IBooks> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    genre: {
      type: String,
      required: [true, 'Genre is required'],
    },
    coverImage: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and Export Model
const Book: Model<IBooks> = mongoose.model<IBooks>('Book', bookSchema);

export default Book;
