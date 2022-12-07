import { Router } from 'express';
import cardRouter from './cards';
import usersRouter from './user';

const rootRouter = Router();

rootRouter.use('/cards', cardRouter);
rootRouter.use('/users', usersRouter);

export default rootRouter;
