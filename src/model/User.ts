import { Schema, model } from 'mongoose';
import { IUser } from '../types/userType';

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    USER: {
      type: Number,
      default: 2001,
    },
    EDITOR: Number,
    ADMIN: Number,
  },
  refreshToken: String,
});

export default model('User', userSchema);
