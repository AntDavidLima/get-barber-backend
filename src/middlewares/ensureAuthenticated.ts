import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Missin authorization token!', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, auth.jwt.secret);

    const { sub } = decoded as TokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch (e) {
    throw new AppError(`Ivalid JWT token. Error: ${e}`, 401);
  }
}
