interface IRoles {
  USER: number;
  EDITOR: number;
  ADMIN: number;
}

export interface IUser {
  username: string;
  roles: IRoles;
  password: string;
  refreshToken: string;
}
