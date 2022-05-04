import { Request, Response } from 'express';
import { DeleteComplimentService } from '../services/DeleteComplimentService';

class DeleteComplimentController {
  async handle(request: Request, response: Response) {
    const deleteComplimentService = new DeleteComplimentService();
    const {
      params: { id },
      user_id: user_id_token,
    } = request;
    const deletedCompliment = await deleteComplimentService.execute(
      id,
      user_id_token
    );
    return response.json(deletedCompliment);
  }
}

export { DeleteComplimentController };
