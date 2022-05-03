import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { ListComplimentsReceivedByUserController } from './controllers/ListComplimentsReceivedByUserController';
import { ListComplimentsSendedByUserController } from './controllers/ListComplimentsSendedByUserController';
import { ListTagsController } from './controllers/ListTagsController';
import { UpdateTagController } from './controllers/UpdateTagController';
import { DeleteTagController } from './controllers/DeleteTagController';
import { ListUsersController } from './controllers/ListUsersController';

const router = Router();

const authenticateUserController = new AuthenticateUserController();
const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

const createTagController = new CreateTagController();
const listTagsController = new ListTagsController();
const updateTagController = new UpdateTagController();
const deleteTagController = new DeleteTagController();

const createComplimentController = new CreateComplimentController();
const listComplimentsReceivedByUserController =
  new ListComplimentsReceivedByUserController();
const listComplimentsSendedByUserController =
  new ListComplimentsSendedByUserController();

// -- USERS --
router.post('/login', authenticateUserController.handle);
router.post('/users', createUserController.handle);
router.get('/users', ensureAuthenticated, listUsersController.handle);

// -- TAGS --
router.post(
  '/tags',
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
);
router.get('/tags', ensureAuthenticated, listTagsController.handle);
router.put(
  '/tags/:id',
  ensureAuthenticated,
  ensureAdmin,
  updateTagController.handle
);
router.delete(
  '/tags/:id',
  ensureAuthenticated,
  ensureAdmin,
  deleteTagController.handle
);

// -- COMPLIMENTS --
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
