import { ZodError } from "zod";
import { Tgenaric, TResponse } from "../interface/error.type";

export const handeleZodError = (err: ZodError): Tgenaric => {
  const errorSources: TResponse[] = err.issues.map((issue) => ({
    path: issue.path[issue.path.length - 1]?.toString() || "",
    message: issue.message,
  }));

  return {
    statusCode: 400,
    message: "Zod validation error",
    errorSources,
  };
};
