import { secret } from 'config/jwt';
import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UserModel from 'models/User';
import DataStoredInToken from 'typings/DataStoredInToken';
import RequestWithUser from 'typings/RequestWithUser';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    // const secret = process.env.JWT_SECRET;
    try {
      const verificationResponse = jwt.verify(cookies.Authorization, secret);

      const id = verificationResponse._id as DataStoredInToken;

      const user = await UserModel.findById(id);

      if (user) {
        request.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

export default authMiddleware;