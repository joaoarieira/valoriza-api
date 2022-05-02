import { Request, Response } from 'express';
import { ListComplimentsReceivedByUserService } from '../services/ListComplimentsReceivedByUserService';

class ListComplimentsReceivedByUserController {
  async handle(request: Request, response: Response) {
    const { user_receiver_id } = request.params;

    const listComplimentsReceivedByUserService =
      new ListComplimentsReceivedByUserService();

    const compliments = await listComplimentsReceivedByUserService.execute(
      user_receiver_id
    );

    return response.json(compliments);
  }
}

export { ListComplimentsReceivedByUserController };
