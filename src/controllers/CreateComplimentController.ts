import { Request, Response } from 'express';
import { CreateComplimentService } from '../services/CreateComplimentService';

class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { message, user_sender_id, user_receiver_id, tag_id } = request.body;

    const createComplimentService = new CreateComplimentService();

    const newCompliment = await createComplimentService.execute({
      message,
      user_sender_id,
      user_receiver_id,
      tag_id,
    });

    return response.json(newCompliment);
  }
}

export { CreateComplimentController };
