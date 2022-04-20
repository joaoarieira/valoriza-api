import express, { Application, NextFunction, Request, Response } from 'express';
import "express-async-errors";
import { router } from './routes';

const app: Application = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  })
});

const port: number = 3333;

app.get("/", (_req, res: Response) => {
  res.send(`Server is running on port: ${port}`);
});

app.listen(port, () => console.log(`🚀 Server is running on port ${port}.`));
