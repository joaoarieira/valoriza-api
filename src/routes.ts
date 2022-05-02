import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { ListComplimentsReceivedByUserController } from './controllers/ListComplimentsReceivedByUserController';
import { ListComplimentsSendedByUserController } from './controllers/ListComplimentsSendedByUserController';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listComplimentsReceivedByUserController =
  new ListComplimentsReceivedByUserController();
const listComplimentsSendedByUserController =
  new ListComplimentsSendedByUserController();

router.post('/login', authenticateUserController.handle);
router.post('/users', createUserController.handle);
router.post(
  '/tags',
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
);

router.post(
  '/compliments',
  ensureAuthenticated,
  createComplimentController.handle
);
router.get(
  '/compliments/receiced/:user_receiver_id',
  ensureAuthenticated,
  listComplimentsReceivedByUserController.handle
);
router.get(
  '/compliments/sended/:user_sender_id',
  ensureAuthenticated,
  listComplimentsSendedByUserController.handle
);

export { router };
