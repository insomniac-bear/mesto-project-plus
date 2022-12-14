import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import auth from '../middlewares/auth';
import {
  createUser,
  getAllUsers,
  getUser,
  getUserById,
  login,
  updateUserAvatar,
  updateUserProfile,
} from '../controllers/user';
import { emailRegex, urlRegex } from '../helpers/validate-url';

export const router = Router();

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(emailRegex),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().regex(urlRegex),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(emailRegex),
    password: Joi.string().required().min(8),
  }),
}), login);
router.get('/', [auth, celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }),
})], getAllUsers);
router.get('/me', [auth, celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }),
})], getUser);
router.get('/:userId', [auth, celebrate({
  params: Joi.object().keys({
    userId: Joi.string(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }),
})], getUserById);
router.patch('/me', [auth, celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
  }),
})], updateUserProfile);
router.patch('/me/avatar', [auth, celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }),
  body: Joi.object().keys({
    avatar: Joi.string().regex(urlRegex),
  }),
})], updateUserAvatar);

export default router;
