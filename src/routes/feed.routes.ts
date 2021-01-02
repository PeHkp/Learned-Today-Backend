import { Router } from 'express';
import FeedController from "../controllers/FeedController"

const feedRouter = Router();

const feedController = new FeedController();

feedRouter.get('/', feedController.index)

export default feedRouter;