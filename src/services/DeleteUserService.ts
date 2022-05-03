import { validate } from 'uuid';
import { prisma } from '../database/prismaClient';

class DeleteUserService {
  async execute(id: string, user_id_token: string) {
    if (!validate(id)) {
      throw new Error('id must be UUID');
    }

    const isAuthenticatedUserTryingToDeleteHimself = id === user_id_token;
    const isAuthenticatedUserAnAdmin =
      (
        await prisma.user.findFirst({
          where: { id: user_id_token },
        })
      )?.admin ?? false;

    if (!isAuthenticatedUserAnAdmin) {
      if (!isAuthenticatedUserTryingToDeleteHimself) {
        throw new Error('You have no permission to delete other users');
      }
    }

    await prisma.compliment.deleteMany({
      where: {
        OR: [{ user_receiver_id: id }, { user_sender_id: id }],
      },
    });

    const userDeleted = await prisma.user.delete({ where: { id } });
    return userDeleted;
  }
}

export { DeleteUserService };
