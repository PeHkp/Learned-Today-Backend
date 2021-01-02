import { Request, Response } from "express";

import CreateUserService from "../services/CreateUserService"

export default class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const perfil_image = request.file.filename;    

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password, perfil_image })

    return response.status(200).json(user);
  }
} 