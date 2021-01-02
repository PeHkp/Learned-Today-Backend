import { Router } from 'express';
import multer from "multer";
import uploadConfig from '../config/multer';

import UserController from '../controllers/UserController'

const usersRouter = Router();
const upload = multer(uploadConfig);

const userController = new UserController();

usersRouter.post('/', upload.single("perfil_image"), userController.create);

export default usersRouter;