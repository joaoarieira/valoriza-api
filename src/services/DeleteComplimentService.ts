import { validate } from 'uuid';
import { prisma } from '../database/prismaClient';

class DeleteComplimentService {
  async execute(id: string, user_id_token: string) {
    if (!validate(id)) {
      throw new Error('id must be UUID');
    }
    const isAuthenticatedUserAnAdmin =
      (await prisma.user.findFirst({ where: { id: user_id_token } })).admin ??
      false;
    if (!isAuthenticatedUserAnAdmin) {
      const isUserReceiverOrSenderOfTheCompliment =
        (await prisma.compliment.count({
          where: {
            OR: [
              { user_receiver_id: user_id_token },
              { user_sender_id: user_id_token },
            ],
          },
        })) > 0;
      if (!isUserReceiverOrSenderOfTheCompliment) {
        throw new Error(
          'You have no permission to delete a compliment that you did not sent or received'
        );
      }
    }

    const deletedCompliment = await prisma.compliment.delete({ where: { id } });
    return deletedCompliment;
  }
}

export { DeleteComplimentService };
