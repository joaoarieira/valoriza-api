import { Request, Response, NextFunction } from 'express';
import { prisma } from '../database/prismaClient';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id } = request;

  const userRequesting = await prisma.user.findFirst({
    where: { id: user_id },
  });

  if (!userRequesting.admin) {
    return response.status(403).json({
      error: 'Forbidden',
    });
  }

  return next();
}
