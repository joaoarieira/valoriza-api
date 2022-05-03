import { validate } from 'uuid';
import { prisma } from '../database/prismaClient';

interface IUpdateTagRequest {
  name?: string;
}

class UpdateTagService {
  async execute(id: string, { name }: IUpdateTagRequest) {
    if (!name || name.length === 0) {
      throw new Error('invalid name');
    }

    if (!validate(id)) {
      throw new Error('id must be UUID');
    }

    // const tag = await prisma.tag.findFirst({ where: { id } });

    // if (!tag) {
    //   throw new Error('Tag related to id does not exists');
    // }

    // if (tag.name === name) {
    //   throw new Error('There is already a tag with this name');
    // }

    const newTag = await prisma.tag.update({ where: { id }, data: { name } });

    return newTag;
  }
}

export { UpdateTagService };
