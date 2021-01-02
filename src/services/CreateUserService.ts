import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";

import knex from "../database/connection";
import AppError from "../errors/AppError";

interface Request {
  name: string;
  email: string;
  password: string;
  perfil_image: string;
}

export default class CreateUserService {
  public async execute({
    name,
    email,
    password,
    perfil_image,
  }: Request): Promise<any> {
    const checkUserExists = await knex("User")
      .where("email", email)
      .select("*");

    const trx = await knex.transaction();

    if (checkUserExists.length != 0) {
      throw new AppError("Email address already used by another user");
    }

    const hashedPassword = await hash(password, 8);

    const id = uuid();

    try {
      await trx("User").insert({
        id,
        name,
        email,
        password: hashedPassword,
        perfil_image: `${process.env.URL_DA_HOSPEDADA}/files/${perfil_image}`,
        follow: [id],
      });
      await trx.commit();

      const user = await knex("User")
        .where("id", id)
        .select("id","name","email","perfil_image","follow");

      return user;
    } catch (error) {
      throw new AppError("Error when create account");
    }
  }
}
