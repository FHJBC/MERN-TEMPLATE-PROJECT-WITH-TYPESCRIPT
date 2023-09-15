import express from 'express';

import authenticationRoutes from './authentication';
import userRoutes from './users';

const router = express.Router();

export default (): express.Router => {

  authenticationRoutes(router);
  userRoutes(router);

  return router;
};