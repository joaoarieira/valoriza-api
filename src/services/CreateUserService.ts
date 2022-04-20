import { prisma } from '../database/prismaClient';

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({ name, email, admin }: IUserRequest) {
    if (!email) {
      throw new Error("Email incorrect");
    }

    const userAlreadyExists = await prisma.users.count({
      where: {
        email,
      }
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        admin,
      }
    });

    return newUser;
  }
}

export { CreateUserService };
