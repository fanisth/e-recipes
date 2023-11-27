// src/api/routes/health.ts
import { Request, Response } from 'express';

export const healthHandler = (_req: Request, res: Response) => {
  res.sendStatus(200);
};
