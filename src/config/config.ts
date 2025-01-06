import { config as conf } from 'dotenv';
conf();
const _config = {
  PORT: process.env.PORT,
};

export const config = Object.freeze(_config);
// why _config why not config chillout its just convention
// so that changes can be dont -> use Freeze
