import dotenv from "dotenv";
dotenv.config();

interface ENVConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: string;
  BYCRIPT_SALT_ROUND: string;
  JWT_ACCESS_SECRECT: string;
  JWT_ACCESS_EXPIRE: string;
  JWT_REFRESH_SECRECT: string;
  JWT_REFRESH_EXPIRE: string;
  FRONTEND_URL: string;
  CLOUDENARY: {
    CLOUDENARY_NAME: String;
    CLOUDENARY_API_KEY: string;
    CLOUDENARY_API_SECRET: string;
  };
}

const LoadEnvVariable = () => {
  const requiredvariable: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "BYCRIPT_SALT_ROUND",
    "JWT_ACCESS_SECRECT",
    "JWT_ACCESS_EXPIRE",
    "JWT_REFRESH_SECRECT",
    "JWT_REFRESH_EXPIRE",
    "CLOUDENARY_NAME",
    "CLOUDENARY_API_KEY",
    "CLOUDENARY_API_SECRET",
    "FRONTEND_URL",
  ];

  requiredvariable.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`missing environment variable ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.DB_URL as string,
    BYCRIPT_SALT_ROUND: process.env.BYCRIPT_SALT_ROUND as string,
    JWT_ACCESS_SECRECT: process.env.JWT_ACCESS_SECRECT as string,
    JWT_ACCESS_EXPIRE: process.env.JWT_ACCESS_EXPIRE as string,
    JWT_REFRESH_SECRECT: process.env.JWT_ACCESS_SECRECT as string,
    JWT_REFRESH_EXPIRE: process.env.JWT_ACCESS_EXPIRE as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
    CLOUDENARY: {
      CLOUDENARY_NAME: process.env.CLOUDENARY_NAME as string,
      CLOUDENARY_API_KEY: process.env.CLOUDENARY_API_KEY as string,
      CLOUDENARY_API_SECRET: process.env.CLOUDENARY_API_SECRET as string,
    },
  };
};

export const envVars = LoadEnvVariable();
