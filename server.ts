import { config } from './src/config/config';
import app from './src/app';

const startServer = () => {
  const port = config.PORT || 3000;
  app.listen(port, () => {
    console.log(`server listens at ${port}`);
  });
};

startServer();
