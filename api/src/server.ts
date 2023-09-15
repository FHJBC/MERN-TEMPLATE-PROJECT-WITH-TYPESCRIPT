import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import * as mongoose from 'mongoose';
import router from './routes';

const {
  MONGO_HOST,
  MONGO_PORT,
  DB_NAME,
} = process.env;

// mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${DB_NAME}`).
//   catch(error => console.error(error));
// catch(error => handleError(error));

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${DB_NAME}`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
}

const app: Application = express();

// cors
app.use(cors({
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());

//body parser
app.use(express.json());

//connect to database
connectDB();

// Add server routes

// routes
app.use('/', router());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, MERN with TypeScript!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
