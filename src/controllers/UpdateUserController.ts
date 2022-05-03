import { Request, Response } from 'express';
import { UpdateUserService } from '../services/UpdateUserService';

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const {
      user_id: user_id_token,
      params: { id },
      body: { name, password, email, admin },
    } = request;
    const updateUserService = new UpdateUserService();
    const updatedUser = await updateUserService.execute(id, user_id_token, {
      name,
      password,
      email,
      admin,
    });
    return response.json(updatedUser);
  }
}

export { UpdateUserController };
