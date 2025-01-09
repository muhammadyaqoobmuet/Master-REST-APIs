import { NextFunction, Request, Response } from 'express';

import { verify } from 'jsonwebtoken';
import { config } from '../config/config';
import { stringify } from 'querystring';
import createHttpError from 'http-errors';

export interface AuthRequest extends Request {
  userId: string;
}

export const authenticateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get token from header
  const token = req.header('Authorization');

  try {
    // pasring token
    const parseToken = token?.split(' ')[1];
    // it can be expire so try catch is nessacary

    //decode it with jwt token to get payload
    const decodeToken = verify(
      parseToken as string,
      config?.JSON_SEC as string
    );

    // decode token is a object now with properties like sub expire etc how do did

    const _req = req as AuthRequest;
    // if we directly add to req ts will give error say there is not porperty like userId so we do jugad hehe
    _req.userId = decodeToken.sub as string;
  } catch (error) {
    next(createHttpError(401, `${error}`));
  }

  next();
};
