import { v2 as cloudinary } from 'cloudinary';
import { config } from './config';

// Configuration
cloudinary.config({
  cloud_name: 'diinw6tgw',
  api_key: '699464475519433', // dekh la bhai mein naya acc bna lunga
  api_secret: config.CLOUDNARY_SEC, // Click 'View API Keys' above to copy your API secret
});

export default cloudinary;
