/* eslint-disable no-unused-vars */
import type { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import StatusCodes from '../helpers/status-codes';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error.CastError || err instanceof Error.ValidationError) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
  } else if (err instanceof Error.DocumentNotFoundError) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Запрашиваемые данные не найдены' });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'На сервере произошла ошибка' });
  }
};

export default errorHandler;
