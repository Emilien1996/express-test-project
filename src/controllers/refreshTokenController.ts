import { Request, Response } from "express";
import users from "../model/users.json";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const UserDb = {
  users,
  setUser: (data: {
    username: string;
    password: string;
    refreshToken: string;
  }) => {
    const founduser = UserDb.users.findIndex(
      (person) => person.username === data.username
    );
    const modified = founduser
      ? UserDb.users.map((person, idx) => {
          if (founduser === idx) {
            return {
              ...person,
              ...data,
            };
          } else {
            return person;
          }
        })
      : UserDb.users;
    return modified;
  },
};

export const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies as { jwt?: string };

  if (!cookies?.jwt) return res.sendStatus(401);
  console.log(cookies.jwt, "finded jwt");
  const refreshToken = cookies.jwt;

  const foundUser = UserDb.users.find(
    (person) => person.refresh_token === refreshToken
  );
  if (!foundUser)
    return res.status(403).send({
      message: "Forbidden",
    });
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== (decoded as typeof foundUser).username)
      return res.sendStatus(403);
    const roles = Object.values(foundUser.roles);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: (decoded as typeof foundUser).username,
          roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.send({ accessToken });
  });
};
