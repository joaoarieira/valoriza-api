import { Request, Response } from 'express';
import { UpdateTagService } from '../services/UpdateTagService';

class UpdateTagController {
  async handle(request: Request, response: Response) {
    const {
      params: { id },
      body: { name },
    } = request;
    const updateTagService = new UpdateTagService();

    const newTag = await updateTagService.execute({ id, name });

    return response.json(newTag);
  }
}

export { UpdateTagController };
