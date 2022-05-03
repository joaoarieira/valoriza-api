import { Request, Response } from 'express';
import { DeleteUserService } from '../services/DeleteUserService';

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const deleteUserService = new DeleteUserService();
    const {
      user_id: user_id_token,
      params: { id },
    } = request;

    const userDeleted = await deleteUserService.execute(id, user_id_token);
    return response.json(userDeleted);
  }
}

export { DeleteUserController };
