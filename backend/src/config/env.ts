import dotenv from 'dotenv';
dotenv.config();

// Env Config Interface for Handling Environment Variables
interface EnvConfig {
  domain: string;
  port: number;
  mongoUri: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  nodeEnv: string;
}

// Utility getEnv function for fetching environment variable
function getEnv(key: string, required = true): string {
  const value = process.env[key];
  if (!value && required) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || '';
}

// Env Config global object for credentials
export const env: EnvConfig = {
  domain: getEnv('DOMAIN', false) || "http://localhost",
  port: Number(getEnv('PORT', false)) || 5000,
  mongoUri: getEnv('MONGO_URI'),
  jwtSecret: getEnv('JWT_SECRET'),
  jwtExpiresIn: getEnv('JWT_EXPIRES_IN', false) || '7d',
  nodeEnv: getEnv('NODE_ENV', false) || 'development',
};