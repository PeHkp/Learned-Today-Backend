import { Request, Response } from "express";

import CreatePostService from "../services/CreatePostService"

export default class PostController {

  async create(request: Request, response: Response) {
    const { text_post } = request.body;
    const image = request.file.filename;  
    const authHeader: any = request.headers.authorization;

    const createPostService = new CreatePostService();

    const post = await createPostService.execute({text_post,image,authHeader})

    return response.status(200).json(post);
  }
} 