import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { prisma } from '../database/prismaClient';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error('Email/Password incorrect');
    }

    const isPasswordOk = await compare(password, user.password);

    if (!isPasswordOk) {
      throw new Error('Email/Password incorrect');
    }

    const token = sign(
      {
        email: user.email,
      },
      'c99b340849007a3e8125c6fcf51df281',
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    return token;
  }
}

export { AuthenticateUserService };
