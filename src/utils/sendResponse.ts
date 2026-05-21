import { Response } from "express";

type TResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
  errors?: unknown;
};

const sendResponse = <T>(
  res: Response,
  statusCode: number,
  data: TResponse<T>
) => {
  return res.status(statusCode).json({
    data
  });
};

export default sendResponse;