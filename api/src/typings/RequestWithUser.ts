import { Request } from 'express';
import IUser from './user';

interface RequestWithUser extends Request {
  user: IUser;
}

export default RequestWithUser;
