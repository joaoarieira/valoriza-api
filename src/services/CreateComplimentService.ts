import { validate } from 'uuid';
import { prisma } from '../database/prismaClient';

interface ICreateComplimentRequest {
  message: string;
  user_sender_id: string;
  user_receiver_id: string;
  tag_id: string;
}

class CreateComplimentService {
  async execute({
    message,
    user_sender_id,
    user_receiver_id,
    tag_id,
  }: ICreateComplimentRequest) {
    if (
      !validate(user_receiver_id) ||
      !validate(user_sender_id) ||
      !validate(tag_id)
    ) {
      throw new Error('All ids must be UUID');
    }

    const isSenderDifferentFromReceiver = user_receiver_id !== user_sender_id;

    if (!isSenderDifferentFromReceiver) {
      throw new Error('user_sender_id must be different from user_receiver_id');
    }

    const isValidUserSender =
      (await prisma.user.count({
        where: {
          id: user_sender_id,
        },
      })) > 0;

    if (!isValidUserSender) {
      throw new Error('User related to user_sender_id does not exists');
    }

    const isValidUserReceiver =
      (await prisma.user.count({
        where: {
          id: user_receiver_id,
        },
      })) > 0;

    if (!isValidUserReceiver) {
      throw new Error('User related to user_receiver_id does not exists');
    }

    const newCompliment = await prisma.compliment.create({
      data: {
        message,
        user_sender_id,
        user_receiver_id,
        tag_id,
      },
    });

    return newCompliment;
  }
}

export { CreateComplimentService };
