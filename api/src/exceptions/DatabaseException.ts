import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose'; // Import Mongoose for MongoDB

class DatabaseException {
  static handleError(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let statusCode = 500;
    let errorMessage = 'Internal Server Error';

    if (error instanceof mongoose.Error) {
      // Handle MongoDB connection error
      statusCode = 503; // Service Unavailable
      errorMessage = 'Database Connection Error';
    }

    console.error(error);

    res.status(statusCode).json({ error: errorMessage });
  }
}

export default DatabaseException;
