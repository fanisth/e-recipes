// src/service/authService.ts
import jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key';

export const generateAccessToken = (user: any) => {
  return jwt.sign(user, secretKey);
};
