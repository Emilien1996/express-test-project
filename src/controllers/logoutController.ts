import { Request, Response } from 'express';
import UserDB from '../model/User';

export const handleLogout = async (req: Request, res: Response) => {
  const cookies = req.cookies as { jwt?: string };

  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;
  const foundUser = await UserDB.findOne({ refreshToken }).exec();

  // is refresh token in database
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true });
    return res.sendStatus(204);
  }
  foundUser.refreshToken = '';
  const result = await foundUser.save();
  console.log({ result });
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
  res.sendStatus(204);
};
