import { Router } from 'express';

import SessionsController from '../controllers/SessionsController'

const SessionRouter = Router();

const sessionsController = new SessionsController();

SessionRouter.post('/',sessionsController.create);

export default SessionRouter;