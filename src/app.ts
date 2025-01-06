import express from 'express';
import createHttpError from 'http-errors';
import { userRouter } from './routes/user.routes';
import { globalErrorHandler } from './middleware/globalErrorHandler';

const app = express();

app.get('/', (req, res) => {
  // throw new Error('error agya bhai lets see');  -> this is not how we through error

  // const error = createHttpError(500, 'somehting went wrong nigger');
  // throw error;
  res.json({
    message: 'welcome dude this is amazing isnt it',
  });
});

// GLOBAL ERROR HANDLER -> note always on last -> middleware
// if req hanlder is async we pass next(erro)
// if not then just pass the flow

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRouter);

app.use(globalErrorHandler);
export default app;
