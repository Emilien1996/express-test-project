import { Request, Response } from 'express';
import UserDB from '../model/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const handleLogin = async (req: Request<{}, {}, { user: string; password: string }>, res: Response) => {
  const { user, password } = req.body;
  const foundUser = await UserDB.findOne({ username: user });
  if (!foundUser)
    return res.status(401).send({
      message: 'UnAuthorized',
    });
  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '10m',
      },
    );
    const refreshToken = jwt.sign(
      {
        username: foundUser.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '1d',
      },
    );
    console.log({ refreshToken });
    // saving refresh token
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log({ result });
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.send({
      accessToken,
    });
  } else {
    res.status(401).send({
      message: 'Something went wrong',
    });
  }
};
