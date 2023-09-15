import IUser from './user';

namespace Express {
  interface Request {
    user: IUser;
  }
}