import { Request, Response } from 'express';
import { ListComplimentsSendedByUserService } from '../services/ListComplimentsSendedByUserService';

class ListComplimentsSendedByUserController {
  async handle(request: Request, response: Response) {
    const { user_sender_id } = request.params;

    const listComplimentsSendedByUserService =
      new ListComplimentsSendedByUserService();

    const compliments = await listComplimentsSendedByUserService.execute(
      user_sender_id
    );

    return response.json(compliments);
  }
}

export { ListComplimentsSendedByUserController };
