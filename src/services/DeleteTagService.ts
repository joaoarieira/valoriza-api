import { validate } from 'uuid';
import { prisma } from '../database/prismaClient';

class DeleteTagService {
  async execute(id: string) {
    if (!validate(id)) {
      throw new Error('id must be UUID');
    }

    const deletedTag = await prisma.tag.delete({ where: { id } });

    return deletedTag;
  }
}

export { DeleteTagService };
