import { Request, Response } from "express";
import users from "../model/users.json";
import bcrypt from "bcrypt";
import { promises } from "fs";
import path from "path";

const UserDb = {
  users,
  setUser: (data: {
    username: string;
    password: string;
    refresh_token: string;
    roles: any;
  }) => {
    UserDb.users.push(data);
  },
};

export const handleNewUser = async (
  req: Request<{}, {}, Partial<{ user: string; password: string }>>,
  res: Response
) => {
  const { password, user } = req.body;
  if (!password || !user)
    return res.status(400).send({
      message: "user or password are required",
    });
  const dublicate = UserDb.users.find((person) => person.username === user);
  if (dublicate)
    return res.status(409).send({
      message: "user with this name already exists",
    });
  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = {
      username: user,
      password: hashedPwd,
      roles: {
        USER: 1984,
      },
      refresh_token: "11",
    };
    UserDb.setUser(newUser);
    await promises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(UserDb.users)
    );
    console.log(UserDb.users, "users");
    res.status(201).send({
      message: `New ${user} Created successfully`,
    });
  } catch (err: any) {
    res.status(500).send({
      message: err.message,
    });
  }
};
