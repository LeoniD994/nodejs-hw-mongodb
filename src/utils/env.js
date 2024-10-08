import dotenv from 'dotenv';

dotenv.config();

export const env = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
};
