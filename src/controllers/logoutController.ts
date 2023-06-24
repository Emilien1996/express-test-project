import { Request, Response } from "express";
import users from "../model/users.json";
import dotenv from "dotenv";

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

export const handleLogout = async (req: Request, res: Response) => {
  const cookies = req.cookies as { jwt?: string };

  if (!cookies?.jwt) return res.sendStatus(204);
  console.log(cookies.jwt, "finded jwt");
  const refreshToken = cookies.jwt;

  const foundUser = UserDb.users.find(
    (person) => person.refresh_token === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.sendStatus(204);
};
