// src/api/routes/protected.ts
import { Request, Response } from 'express';

export const protectedHandler = (req: Request & { userId?: string }, res: Response) => {
  // Access 'userId' directly from the Request object
  const userId = req.userId;

  if (!userId) {
    // Handle the case when userId is not present (optional)
    return res.status(401).json({ error: 'User ID not available' });
  }

  res.json({ message: 'This is a protected route', userId });
};
