import { verify } from "jsonwebtoken";

import knex from "../database/connection";
import AppError from "../errors/AppError";
import authConfig from "../config/auth";

interface Request {
  text_post: string;
  image: string;
  authHeader: string;
}
interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default class CreatePostService {
  public async execute({
    text_post,
    image,
    authHeader,
  }: Request): Promise<any> {
    const { secret } = authConfig.jwt;

    const [, token] = authHeader.split(" ");
    const trx = await knex.transaction();

    try {
      
      const decoded = verify(token, secret);

      const { sub } = decoded as TokenPayload;

      const id = sub;

      await trx("Post").insert({
        text_post,
        like: 0,
        image: `${process.env.URL_DA_HOSPEDADA}/files/${image}`,
        user_id: id,
      });
      await trx.commit();

      const post = {
        text_post,
        like: 0,
        image: `${process.env.URL_DA_HOSPEDADA}/files/${image}`,
        user_id: id,
      }

      return post
    } catch {
      await trx.rollback();
      throw new AppError("Error on create post", 400);
    }
  }
}
