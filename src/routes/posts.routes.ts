import { Router } from 'express';
import multer from "multer";
import uploadConfig from '../config/multer';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import PostController from '../controllers/PostController'

const PostRouter = Router();
const upload = multer(uploadConfig);

const postController = new PostController();

PostRouter.use(ensureAuthenticated)

PostRouter.post('/',upload.single("image"),postController.create);

export default PostRouter;