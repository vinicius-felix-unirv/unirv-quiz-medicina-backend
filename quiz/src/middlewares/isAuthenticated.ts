import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import authConfig from '../authentication/auth';
import { UnauthorizedError } from '../exception/UnauthorizedError';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError('JWT Token is missing');
  }

  const [, token] = authHeader.split(' ');


  try {
    const decodeToken = verify(token, authConfig.jwt.secret) as JwtPayload;

    switch (decodeToken.role) {
      case 1: {
        return next();
      }
      case 2: {
        if (req.path.includes('/categorias') || req.path.includes('/perguntas')) {
          return next();
        }
        break;
      }
      default: {
        throw new UnauthorizedError('Unauthorized');
      }
    }


  } catch {
    throw new UnauthorizedError('JWT Token is missing');
  }
};