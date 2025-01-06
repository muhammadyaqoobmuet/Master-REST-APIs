import { config } from './src/config/config';
import app from './src/app';
import connectDB from './src/config/db';

const startServer = async () => {
  // connect to DB
  // await connectDB();

  const port = config.PORT || 3000;
  app.listen(port, () => {
    console.log(`server listens at ${port}`);
  });
};

startServer();
