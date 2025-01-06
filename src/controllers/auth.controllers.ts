import express, { NextFunction, Request, Response } from 'express';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // getting data from params
  const { name, email, password } = req.params;
  console.log(name, email, password);
  res.status(200).json({
    message: 'user created LOL',
  });
};
