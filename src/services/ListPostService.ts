import { verify } from "jsonwebtoken";
import moment from 'moment'

import knex from "../database/connection";
import AppError from "../errors/AppError";
import authConfig from "../config/auth";

interface Request {
  authHeader: string;
}
interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default class ListPostService {
  public async execute({
    authHeader,
  }: Request): Promise<any> {
    const { secret } = authConfig.jwt;
    
    const [, token] = authHeader.split(" ");
    try {
      
      const decoded = verify(token, secret);

      const { exp } = decoded as TokenPayload;
      const timestamp = moment().unix()

      if (exp < timestamp) {
        throw new AppError("Error invalid token", 400);
      }

      let posts = await knex("Post")
      .select("*");
      
      posts = await posts.reverse()

      return posts
    } catch {
      throw new AppError("Error on load feed", 400);
    }
  }
}