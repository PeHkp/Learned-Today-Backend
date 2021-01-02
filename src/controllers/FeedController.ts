import { Request, Response } from "express";

import ListPostService from "../services/ListPostService";

export default class FeedController {
  async index(request:Request, response:Response){
    const authHeader: any = request.headers.authorization;

    const listPostService = new ListPostService()
    
    const posts = await listPostService.execute({authHeader})

    return response.status(200).json(posts);
  }
}