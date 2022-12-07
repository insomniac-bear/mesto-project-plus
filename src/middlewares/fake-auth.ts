import type { Request, Response, NextFunction } from 'express';

export const fakeAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '638f7a66930883464434f1a3',
  };

  next();
};
