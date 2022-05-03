import { validate } from 'uuid';
import { prisma } from '../database/prismaClient';
import { deleteUndefinedFields } from '../utils';

interface IUpdateUserRequest {
  name?: string;
  password?: string;
  email?: string;
  admin?: boolean;
}

class UpdateUserService {
  async execute(id: string, user_id_token: string, data: IUpdateUserRequest) {
    if (!validate(id)) {
      throw new Error('id must be UUID');
    }

    if (id !== user_id_token) {
      const isAuthenticatedUserAnAdmin =
        (
          await prisma.user.findFirst({
            where: { id: user_id_token },
          })
        ).admin ?? false;
      if (!isAuthenticatedUserAnAdmin) {
        throw new Error('You have no permission to update other users');
      }
    }

    const dataToUpdate = deleteUndefinedFields(data);
    console.log(dataToUpdate);
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { ...dataToUpdate },
    });
    return updatedUser;
  }
}

export { UpdateUserService };
