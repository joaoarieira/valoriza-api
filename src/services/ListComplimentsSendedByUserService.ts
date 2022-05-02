import { prisma } from '../database/prismaClient';

class ListComplimentsSendedByUserService {
  async execute(user_sender_id: string) {
    const isValidUser =
      (await prisma.user.count({ where: { id: user_sender_id } })) > 0;

    if (!isValidUser) {
      throw new Error('invalid user_sender_id');
    }

    const compliments = await prisma.compliment.findMany({
      where: { user_sender_id },
      include: { user_receiver: true, user_sender: true, tag: true },
    });

    return compliments;
  }
}

export { ListComplimentsSendedByUserService };
