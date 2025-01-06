import { config as conf } from 'dotenv';
conf();
const _config = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  env: process.env.NODE_ENV,
};

export const config = Object.freeze(_config);
// why _config why not config chillout its just convention
// so that changes can be dont -> use Freeze
