import express from 'express';
import { registerUser } from '../controllers/auth.controllers';

export const userRouter = express.Router();

userRouter.post('/register', registerUser);
