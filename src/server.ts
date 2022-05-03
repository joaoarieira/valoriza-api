/* eslint-disable no-console */
import express, { Application, NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { Prisma } from '@prisma/client';

import { router } from './routes';

const app: Application = express();

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(router);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      const errorMessage = err.message.split('\n').at(-1)?.trim();
      return response.status(400).json({ error: errorMessage });
    }

    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
);

const port = 3333;

app.get('/', (_req, res: Response) => {
  res.send(`Server is running on port: ${port}`);
});

const server = app.listen(port, () =>
  console.log(`🚀 Server is running on port ${port}.`)
);

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
