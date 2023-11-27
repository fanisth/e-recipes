// src/core/authentication.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key'; // Replace with your actual secret key

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err: any, user: any) => {
    if (err) {
      return res.sendStatus(403);
    }
    // Assign 'userId' directly to the 'Request' object
    req.userId = user.userId;
    next();
  });
};
