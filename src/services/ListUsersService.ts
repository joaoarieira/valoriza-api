import { prisma } from '../database/prismaClient';

class ListUsersService {
  async execute() {
    // TODO: esconder hash da senha
    const users = await prisma.user.findMany();
    return users;
  }
}

export { ListUsersService };
