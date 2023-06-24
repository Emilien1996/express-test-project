import { Request, Response, Router } from "express";
import users from "../model/users.json";
import bcrypt from "bcrypt";
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

export const handleLogin = async (
  req: Request<{}, {}, { user: string; password: string }>,
  res: Response
) => {
  const { user, password } = req.body;
  const foundUser = UserDb.users.find((person) => person.username === user);
  if (!foundUser)
    return res.status(401).send({
      message: "UnAuthorized",
    });
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1m",
      }
    );
    const refreshToken = jwt.sign(
      {
        username: foundUser.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const currentUser = {
      ...foundUser,
      refreshToken,
    };
    const DB = UserDb.setUser(currentUser);
    console.log({ DB });
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.send({
      accessToken,
    });
  } else {
    res.status(401).send({
      message: "Something went wrong",
    });
  }
};
