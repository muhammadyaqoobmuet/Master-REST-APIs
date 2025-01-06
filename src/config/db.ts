import mongoose from 'mongoose';
import { config } from './config';

const connectDB = async () => {
  try {
    // basics first we listen for event then event occur
    mongoose.connection.on('connected', () => {
      console.log('connected');
    });
    mongoose.connection.on('error', (err) => {
      console.log('there was error in contecting to db', err);
    });
    const responce = await mongoose.connect(config.MONGO_URL as string);

    console.log(
      responce.connection.readyState === 1
        ? 'server is connected'
        : responce.connection.readyState
    );
  } catch (error) {
    console.log('could not connect to server');
    console.error(error);
    process.exit(1); // means exit
  }
};

export default connectDB;
