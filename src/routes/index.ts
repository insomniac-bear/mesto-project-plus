import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import cardRouter from './cards';
import usersRouter from './user';
import { createUser, login } from '../controllers/user';
import { urlRegex } from '../helpers/validate-url';

const rootRouter = Router();

rootRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().regex(urlRegex),
  }),
}), createUser);
rootRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required().min(8),
  }),
}), login);

rootRouter.use('/cards', cardRouter);
rootRouter.use('/users', usersRouter);

export default rootRouter;
