import { TResponse } from "../interface/error.type";

export const handelDuplicateError = (err: any) => {
  const fieldName = Object.keys(err.keyValue || {})[0] || "Field";
  const errorSources: TResponse[] = [
    {
      path: fieldName,
      message: `${fieldName} already exists`,
    },
  ];

  return {
    statusCode: 400,
    message: `${fieldName} already exists`,
    errorSources,
  };
};
