import express, { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // getting data from params
  const { name, email, password } = req.body as {
    name: string;
    email: string;
    password: string;
  };
  console.log(name, email, password);

  // validation 
  if (!name || !email || !password) {
    const createdError: createHttpError.HttpError<400> = createHttpError(
      400,
      'invaild input all feilds are required'
    );
    return next(createdError)
  }


  // checking user in DB it already exists of not

  try {
        
  } catch (error) {
    
  }

  
  res.status(200).json({
    message: 'user created LOL',
  });
};
