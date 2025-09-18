/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { TResponse } from "../../interface/error.type";
import { handelDuplicateError } from "../../helpers/handeleDuplicateError";
import { handeleZodError } from "../../helpers/handeleZodError";
import { ZodError } from "zod";
import { handelCastError } from "../../helpers/hendeleCstError";
import { handelValidationError } from "../../helpers/handeleValidationError";
import AppError from "../../errorHelper/AppError";
import { deleteImageCloudenary } from "../../config/cloudenary.config";

export const globalErrorhandelar = async (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorSources: TResponse[] = [];

  if (req.file) {
    await deleteImageCloudenary(req.file.path);
  }
  // MongoDB duplicate key error
  if (err.code === 11000) {
    const simplified = handelDuplicateError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
  }

  if (
    req.files &&
    Array.isArray(req.files) &&
    (req.files as Express.Multer.File[]).length > 0
  ) {
    const imageUrls = (req.files as Express.Multer.File[]).map(
      (file) => file.path
    );

    await Promise.all(imageUrls.map((url) => deleteImageCloudenary(url)));
  }

  // Zod validation error
  else if (err instanceof ZodError) {
    const simplified = handeleZodError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorSources = simplified.errorSources || [];
  }

  // Cast error (invalid ObjectId)
  else if (err.name === "CastError") {
    const simplified = handelCastError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorSources = simplified.errorSources || [];
  }

  // Mongoose validation error
  else if (err.name === "ValidationError") {
    const simplified = handelValidationError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorSources = simplified.errorSources || [];
  }

  // Custom AppError
  else if (err instanceof AppError) {
    statusCode = err.statuscode;
    message = err.message;
  }

  // Generic Error
  else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
  });
};
