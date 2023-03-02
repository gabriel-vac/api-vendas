import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors'; // important
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';
import routes from './routes';
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory)); // example http://localhost:3333/files/4ff057356f51623c1254-git.jpeg

app.use(routes);

app.use(errors()); // errors celebrate

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.log({ error });
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 3333!');
});
