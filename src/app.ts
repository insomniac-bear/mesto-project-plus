import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import rootRouter from './routes';
import { fakeAuthMiddleware } from './middlewares/fake-auth';
import { StatusCode } from './helpers/status-codes';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(fakeAuthMiddleware);
app.use('/', rootRouter);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
