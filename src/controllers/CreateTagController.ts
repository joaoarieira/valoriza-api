import { Request, Response } from 'express';
import { CreateTagService } from '../services/CreateTagService';

class CreateTagController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const createTagService = new CreateTagService();

    const newTag = await createTagService.execute({ name });

    return response.json(newTag);
  }
}

export { CreateTagController };
