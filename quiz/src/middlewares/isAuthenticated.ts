import { NextFunction, Request, Response } from 'express';
import {  verify } from 'jsonwebtoken';
import authConfig from '../authentication/auth';


export const authorize = (allowedRoles: number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers['authorization']?.split(' ')[1];

      if (!token) {
          return res.status(401).json({ message: 'Token não fornecido' });
      }

      try {
          const decoded: any = verify(token, authConfig.jwt.secret);
          const userRole = decoded.role;

          if (!allowedRoles.includes(userRole)) {
              return res.status(403).json({ message: 'Permissão negada' });
          }

          // req.user = decoded; // Armazena informações do usuário no req para uso futuro
          next();
      } catch (error) {
          return res.status(401).json({ message: 'Token inválido' });
      }
  };
};

