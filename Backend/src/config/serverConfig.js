import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;

export const NODE_ENV = process.env.NODE_ENV || "development";

export const DEV_DB_URL = process.env.DEV_DB_URL;

export const PROD_DB_URL = process.env.PROD_DB_URL;

export const JWT_SECRET = process.env.JWT_SECRET;

export const JWT_EXPIRY = process.env.JWT_EXPIRY || "1d";

export const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

export const MAIL_ID = process.env.MAIL_ID;

export const REDIS_HOST = process.env.REDIS_HOST;

export const REDIS_PORT = process.env.REDIS_PORT;

export const ENABLE_EMAIL_VERIFICATION = process.env.ENABLE_EMAIL_VERIFICATION || 'true';

export const APP_LINK = process.env.APP_LINK;

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_CLOUD_SECRET = process.env.CLOUDINARY_CLOUD_SECRET;

