import type { NextFunction, Request, Response } from 'express';
import StatusCodes from '../helpers/status-codes';
import { cardModel } from '../models';

export const getAllCards = (req: Request, res: Response, next: NextFunction) => cardModel.find({})
  .then((cards) => res.status(StatusCodes.OK).json(cards))
  .catch((err) => next(err));

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const ownerId = req.user._id;
  const { name, link } = req.body;
  return cardModel.create({
    name,
    link,
    owner: ownerId,
  })
    .then((card) => res.status(StatusCodes.CREATED).json(card))
    .catch((err) => next(err));
};

export const removeCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;

  return cardModel.findByIdAndRemove(cardId)
    .then((card) => res.status(StatusCodes.OK).json(card))
    .catch((err) => next(err));
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  return cardModel.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(StatusCodes.OK).json(card))
    .catch((err) => next(err));
};

export const dislikeCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  return cardModel.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(StatusCodes.OK).json(card))
    .catch((err) => next(err));
};
