import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import authConfig from '../authentication/auth';
import { UnauthorizedError } from '../exception/UnauthorizedError';
import { UtilsHelp } from '../utils/utils';

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

  // 1 adm, 2 professor, 3 aluno

  const decodeToken = verify(token, authConfig.jwt.secret) as JwtPayload;
  try {

    console.log(req.method);

    switch (decodeToken.role) {
      case 1: {
        return next();
      }
      case 2: {
        return next();
      }
      case 3: {

        // let roles: AuthorizationByRole[] = [];

        let teste: boolean[] = [];
        console.log('role', decodeToken.role);
        console.log('url', req.url);
        console.log('method', req.method);



        teste = UtilsHelp.retornaAutorizacao(3).map(x => {
          console.log(2, x.url.includes(req.method));
          if (x.method.includes(req.method) && x.url.includes(req.url)) {
            x.url.map(u => {
              console.log('passando aqui');
              if (u.indexOf(req.url) != -1) {
                console.log(3, 'contem');
                return true;
              }
              return false;
            }
            );
            return true;
          }
          else return false;
        });
        console.log(1, teste);

        if (teste.includes(true)) {
          return next();
        } else {
          throw new UnauthorizedError('Unauthorized');
        }
        return;
      }
      default: {
        throw new UnauthorizedError('Unauthorized');
      }
    }

  } catch {
    throw new UnauthorizedError('JWT Token is missing or Route Not Authorized');
  }
};