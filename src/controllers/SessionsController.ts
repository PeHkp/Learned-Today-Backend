import { Request, Response } from "express";

import AuthenticateUserService from "../services/AuthenticateUserService"

export default class SessionController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;   

    const authenticateUserService = new AuthenticateUserService();

    const user = await authenticateUserService.execute({ email, password })

    return response.status(200).json(user);
  }
} 