import type { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import StatusCodes from '../helpers/status-codes';
import { userModel } from '../models';

type TUserData = {
  name?: string;
  about?: string;
  avatar?: string;
};

type TUserId = string | ObjectId;

function updateUserData(userId: TUserId, data: TUserData) {
  return userModel.findByIdAndUpdate(userId, data, {
    new: true,
    runValidators: true,
  });
}

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  return userModel.create({
    name,
    about,
    avatar,
  })
    .then((user) => res
      .status(StatusCodes.CREATED)
      .json(user))
    .catch((err) => next(err));
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.userId;

  return userModel.findById(id)
    .then((user) => res.status(StatusCodes.OK).json(user))
    .catch((err) => next(err));
};

export const getAllUsers = (req: Request, res: Response, next: NextFunction) => userModel.find()
  .then((users) => res.status(StatusCodes.OK).json(users))
  .catch((err) => next(err));

export const updateUserProfile = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { name, about } = req.body;

  return updateUserData(_id, { name, about })
    .then((user) => res.status(StatusCodes.OK).json(user))
    .catch((err) => next(err));
};

export const updateUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  return updateUserData(_id, { avatar })
    .then((user) => res.status(StatusCodes.OK).json(user))
    .catch((err) => next(err));
};
