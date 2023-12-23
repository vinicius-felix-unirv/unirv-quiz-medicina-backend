import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../exception/apiError';

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;
  const message = statusCode ? error.message : 'Internal Error';
  return res.status(statusCode).json({ status: statusCode, message: message });
};