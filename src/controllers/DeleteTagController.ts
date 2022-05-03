import { Request, Response } from 'express';
import { DeleteTagService } from '../services/DeleteTagService';

class DeleteTagController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const deleteTagService = new DeleteTagService();
    const deleteResult = await deleteTagService.execute(id);
    return response.json(deleteResult);
  }
}

export { DeleteTagController };
