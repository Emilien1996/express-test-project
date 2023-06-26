import { Request } from 'express';

export interface RequestWithRoles extends Request {
  roles?: number[];
}
