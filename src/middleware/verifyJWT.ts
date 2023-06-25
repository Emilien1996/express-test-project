import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RequestWithRoles } from '../types/types';

export const verifyJWT = async (req: RequestWithRoles, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || (req.headers.Authorization as string);
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).send({
      message: 'unauthorized',
    });
  }
  const token = authHeader.split('')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = (
      decoded as {
        UserInfo: {
          username: string;
          roles: number[];
        };
      }
    ).UserInfo.username;
    req.roles = (
      decoded as {
        UserInfo: {
          username: string;
          roles: number[];
        };
      }
    ).UserInfo.roles;
    next();
  });
};
