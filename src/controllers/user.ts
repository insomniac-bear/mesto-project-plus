import type { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../helpers/status-codes';
import { userModel } from '../models';

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return userModel.create({
    name,
    about,
    avatar,
  })
    .then((user) => res
      .status(StatusCode.CREATED)
      .json(user))
    .catch((err) => res
      .status(StatusCode.BAD_REQUEST)
      .json(err));
};

export const getUserById = (req: Request, res: Response) => {
  const id = req.params.userId;
  return userModel.findById(id)
    .then((user) => res.status(StatusCode.OK).json(user))
    .catch((err) => res.status(StatusCode.NOT_FOUND).json(err));
};

export const getAllUsers = (req: Request, res: Response) => userModel.find()
  .then((users) => res.status(StatusCode.OK).json(users))
  .catch((err) => res.status(StatusCode.NOT_FOUND).json(err));

export const updateUserProfile = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  return userModel.findByIdAndUpdate(_id, {
    name,
    about,
  })
    .then((user) => res.status(StatusCode.OK).json(user))
    .catch((err) => next(err));
};

export const updateUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  return userModel.findByIdAndUpdate(_id, { avatar })
    .then((user) => res.status(StatusCode.OK).json(user))
    .catch((err) => next(err));
};
