import express, { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import User from '../models/user.models';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { config } from '../config/config';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body as {
    name: string;
    email: string;
    password: string;
  };

  // Validation
  if (!name || !email || !password) {
    return next(
      createHttpError(400, 'Invalid input: All fields are required.')
    );
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createHttpError(400, 'User already exists! Try to log in.'));
    }

    // Hash password and create new user
    const hashedPassword = await bcrypt.hash(password, 11);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = sign({ sub: newUser._id }, config.JSON_SEC as string, {
      expiresIn: '1d',
    });

    res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      token,
    });
  } catch (error: unknown) {
    // Improved error handling
    if (error instanceof Error) {
      next(createHttpError(500, `Server Error: ${error.message}`));
    } else {
      next(createHttpError(500, 'Unknown server error occurred.'));
    }
  }
};


export const loginUser = async (req:Request , res:Response , next:NextFunction ) =>{

  const {email , password} = req.body as {email : string , password:string}


  try {
    
  } catch (error) {
    
  }

}