import type { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import StatusCodes from '../helpers/status-codes';
import { userModel } from '../models';
import { JWT_SECRET } from '../config/config';

type TUserData = {
  name?: string;
  about?: string;
  avatar?: string;
};

type TUserId = string | JwtPayload;

function updateUserData(userId: TUserId, data: TUserData) {
  return userModel.findByIdAndUpdate(userId, data, {
    new: true,
    runValidators: true,
  });
}

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => userModel.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => res
      .status(StatusCodes.CREATED)
      .json({
        _id: user._id,
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      }))
    .catch(next);
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.userId;

  return userModel.findById(id)
    .then((user) => res.status(StatusCodes.OK).json(user))
    .catch(next);
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;

  return userModel.findById(_id)
    .then((user) => res.status(StatusCodes.OK).json(user))
    .catch(next);
};

export const getAllUsers = (req: Request, res: Response, next: NextFunction) => userModel.find()
  .then((users) => res.status(StatusCodes.OK).json(users))
  .catch(next);

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
    .catch(next);
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res
        .status(StatusCodes.OK)
        .send({ token });
    })
    .catch(next);
};
