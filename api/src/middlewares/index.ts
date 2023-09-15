import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../repositories/user.repository';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const sessionToken = req.cookies['USER-AUTH'];

    // console.log("sessionToken: " + sessionToken);

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    console.log("existingUser: " + existingUser);

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;

    // const currentUserId = get(req, 'identity._id') as string;

    const identityId = get(req, 'identity._id') as unknown;

    // console.log("identityId test", identityId);

    const currentUserId = identityId as string;

    console.log("currentUserId: " + typeof currentUserId);

    if (!currentUserId || typeof currentUserId !== 'string') {
      return res.sendStatus(400);
    }


    if (!currentUserId) {
      return res.sendStatus(400);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}