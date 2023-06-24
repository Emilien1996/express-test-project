import { NextFunction, Request, Response } from "express";

export const allowedOrigins = ["http://localhost:3000"];

export const credentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const origin = req.headers.origin;
  if (!origin) return res.sendStatus(403);
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", "*");
    next()
  }
};
