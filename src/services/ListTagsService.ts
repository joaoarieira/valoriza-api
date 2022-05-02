import { prisma } from '../database/prismaClient';

class ListTagsService {
  async execute() {
    const tags = await prisma.tag.findMany();
    return tags;
  }
}

export { ListTagsService };
