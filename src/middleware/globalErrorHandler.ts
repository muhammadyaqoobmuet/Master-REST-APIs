import { NextFunction, Response, Request } from 'express';
import { HttpError } from 'http-errors';
import app from '../app';
import { config } from '../config/config';

export const globalErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode: number = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message,
    errorStack:
      config?.env == 'DEVLOPMENT' ? err.stack : 'error Stack nhi dikhaunga', // stack of errors dont show in production sens info can be leaked
  });
};
