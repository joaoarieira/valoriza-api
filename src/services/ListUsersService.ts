import { prisma } from '../database/prismaClient';

class ListUsersService {
  async execute() {
    const users = await prisma.user.findMany();
    return users;
  }
}

export { ListUsersService };
