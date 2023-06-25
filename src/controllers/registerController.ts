import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserDB from '../model/User';

export const handleNewUser = async (
  req: Request<{}, {}, Partial<{ user: string; password: string }>>,
  res: Response,
) => {
  const { password, user } = req.body;
  if (!password || !user)
    return res.status(400).send({
      message: 'user or password are required',
    });
  // check for duplicate username in DB
  const dublicate = await UserDB.findOne({ username: user }).exec();

  if (dublicate)
    return res.status(409).send({
      message: 'user with this name already exists',
    });
  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);
    // create and store the new User
    const result = await UserDB.create({
      username: user,
      password: hashedPwd,
    });

    res.status(201).send({
      message: `New ${result.username} Created successfully`,
    });
  } catch (err) {
    res.status(500).send({
      message: err,
    });
  }
};
