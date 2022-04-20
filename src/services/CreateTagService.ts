import { prisma } from '../database/prismaClient';

interface ITagRequest {
  name: string;
}

// TODO: usar lib de validação de campos

class CreateTagService {
  async execute({ name }: ITagRequest) {
    if (!name) {
      throw new Error("Name incorrect");
    }

    const tagAlreadyExists = await prisma.tags.count({
      where: {
        name
      }
    }) > 0;

    if (tagAlreadyExists) {
      throw new Error("Tag already exists");
    }

    const newTag = prisma.tags.create({
      data: {
        name,
      }
    });

    return newTag;
  }
}

export { CreateTagService };
