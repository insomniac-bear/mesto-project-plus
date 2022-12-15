import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import auth from '../middlewares/auth';
import {
  getAllCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard,
} from '../controllers/card';
import { urlRegex } from '../helpers/validate-url';

const router = Router();

router.get('/', [auth, celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }),
})], getAllCards);
router.post('/', auth, celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(urlRegex),
  }),
}), createCard);
router.delete('/:cardId', [auth, celebrate({
  params: Joi.object().keys({
    userId: Joi.string(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }),
})], removeCard);
router.put('/:cardId/likes', [auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }),
})], likeCard);
router.delete('/:cardId/likes', [auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string(),
  }),
})], dislikeCard);

export default router;
