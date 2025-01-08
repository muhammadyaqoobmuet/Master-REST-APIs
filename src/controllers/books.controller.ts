import express, { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import User from '../models/user.models';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { config } from '../config/config';

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({});
};
