import mongoose from "mongoose";
import { Tgenaric, TResponse } from "../interface/error.type";

export const handelValidationError = (
  err: mongoose.Error.ValidationError
): Tgenaric => {
  const errorSources: TResponse[] = [];

  Object.values(err.errors).forEach((error: any) => {
    errorSources.push({
      path: error.path,
      message: error.message,
    });
  });

  return {
    statusCode: 400,
    message: "validation error",
    errorSources,
  };
};
