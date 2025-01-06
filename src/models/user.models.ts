import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for TypeScript
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  
  createdAt: Date;
  updatedAt: Date;
}

// Define Schema
const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Email is invalid'], // Regex for email validation
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
   
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and Export Model
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
