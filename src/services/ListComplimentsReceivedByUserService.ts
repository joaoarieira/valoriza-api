import { prisma } from '../database/prismaClient';

class ListComplimentsReceivedByUserService {
  async execute(user_receiver_id: string) {
    const user =
      (await prisma.user.count({
        where: {
          id: user_receiver_id,
        },
      })) > 0;

    if (!user) {
      throw new Error('invalid user_receiver_id');
    }

    const compliments = await prisma.compliment.findMany({
      where: {
        user_receiver_id,
      },
    });

    return compliments;
  }
}

export { ListComplimentsReceivedByUserService };
