import dotenv from "dotenv";
dotenv.config();

interface ENVConfig {
  PORT: string;
  DB_URL: string;
}

const LoadEnvVariable = () => {
  const requiredvariable: string[] = ["PORT", "DB_URL"];

  requiredvariable.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`missing environment variable ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
  };
};

export const envVars = LoadEnvVariable();
