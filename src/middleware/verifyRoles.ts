import { NextFunction, Response } from 'express-serve-static-core';
import { RequestWithRoles } from '../types/types';

export const verifyRoles = (...allowedRoles: number[]) => {
  return (req: RequestWithRoles, res: Response, next: NextFunction) => {
    if (req?.roles) return res.sendStatus(401);
    const roles = [...allowedRoles];
    const result = req?.roles?.map((role) => roles.includes(role)).filter(Boolean);
    if (!result?.length) return res.sendStatus(401);
    next();
  };
};
