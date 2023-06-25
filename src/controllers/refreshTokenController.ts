import { Request, Response } from 'express';
import UserDb from '../model/User';
import jwt from 'jsonwebtoken';

export const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies as { jwt?: string };

  if (!cookies?.jwt) return res.sendStatus(401);
  console.log(cookies.jwt, 'finded jwt');
  const refreshToken = cookies.jwt;

  const foundUser =  await UserDb.findOne({ refreshToken }).exec();
  if (!foundUser)
    return res.status(403).send({
      message: 'Forbidden',
    });
    // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== (decoded as typeof foundUser).username) return res.sendStatus(403);
    const roles = Object.values(foundUser.roles);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: (decoded as typeof foundUser).username,
          roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '10m' },
    );
    res.send({ accessToken });
  });
};
