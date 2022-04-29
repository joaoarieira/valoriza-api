import { hash } from 'bcryptjs';
import { prisma } from '../database/prismaClient';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

const HASH_SALT = 8;

class CreateUserService {
  async execute({ name, email, password, admin = false }: IUserRequest) {
    if (!email) {
      throw new Error('Email incorrect');
    }

    const userAlreadyExists = await prisma.user.count({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const passwordHash = await hash(password, HASH_SALT);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        admin,
        password: passwordHash,
      },
    });

    return newUser;
  }
}

export { CreateUserService };
