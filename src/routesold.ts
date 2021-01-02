import express from "express";
import multer from "multer";
import uploadConfig from './config/multer';

// System Routes
import ControllerPost from "./controllersOld/ControllerPost";
import ControllerFeed from "./controllersOld/ControllerFeed";
import ControllerFollow from "./controllersOld/ControllerFollow";

// Validation Routes

const routes = express.Router();
const upload = multer(uploadConfig);

// System Objects Routes
const PostController = new ControllerPost();
const FeedController = new ControllerFeed();
const FollowController = new ControllerFollow();


routes.post("/post/create", upload.single("image"), PostController.create);
routes.put("/post/edit/:id", PostController.edit);
routes.delete("/post/delete/:id", PostController.delete);

routes.put("/feed/like/:id", FeedController.like);
routes.put("/feed/dnlike/:id", FeedController.dnlike);

routes.get("/follow/:id", FollowController.follow);
routes.get("/unfollow/:id", FollowController.unfollow);

export default routes;