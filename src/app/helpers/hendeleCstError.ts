import { TResponse } from "../interface/error.type";

export const handelCastError = (err: any) => {
  const errorSources: TResponse[] = [
    {
      path: err.path || "",
      message: "Invalid MongoDB ObjectId. Please provide a valid ID.",
    },
  ];

  return {
    statusCode: 400,
    message: "Invalid MongoDB ObjectId. Please provide a valid ID.",
    errorSources,
  };
};
