import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import auth from '../middlewares/auth';
import {
  getAllUsers,
  getUser,
  getUserById,
  updateUserAvatar,
  updateUserProfile,
} from '../controllers/user';
import { urlRegex } from '../helpers/validate-url';

export const router = Router();

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
    userId: Joi.string().length(24).hex().required(),
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
