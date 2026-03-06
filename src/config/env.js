import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const env = {
    dbConfig: dbConfig,
    JWT_SECRET: process.env.JWT_SECRET,
}

export default env;