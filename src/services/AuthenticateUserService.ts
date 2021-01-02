import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import knex from "../database/connection";

import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: any;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {

    let user =  await knex("User")
    .where("email", email)
    .select("*")
    
    if (user.length === 0) {
      throw new AppError('Incorrect email or password combination.', 400);
    }

    user = user[0]
    
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email or password combination.', 400);
    }
    
    
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    delete user.password
    return { user, token };
    
  }
}
export default AuthenticateUserService;
