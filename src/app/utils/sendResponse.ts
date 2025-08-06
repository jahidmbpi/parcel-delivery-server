import { Response } from "express";

interface Tmeta {
  total: number;
}

interface TResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: Tmeta;
}

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(Number(data.statusCode)).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};
