import dotenv from "dotenv";
import { Request, Response, NextFunction, response } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

export const verifyJWT = async (
  req: Request<{}>,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).send({
      message: "unauthorized",
    });
  const token = authHeader.split("")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403);
    req.user = (decoded as { username: string }).username;
    next();
  });
  console.log(authHeader);
};

