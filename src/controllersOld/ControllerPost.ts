import { Request, Response } from "express";
import knex from "../database/connection";

class ControllerPost {
  async edit(req: Request, res: Response) {
    const { id } = req.params;
    const { text_post } = req.body;
    const { token } = req.headers;

    const trx = await knex.transaction();

    if (text_post && token && id) {
      try {
        const data_user = await trx("User")
          .where("token_challenger", token)
          .select("id")
          .first();
        const data_post = await trx("Post")
          .where("id", data_user.id)
          .select("user_id")
          .first();
        await trx.commit();

        if (data_user.id != data_post.user_id) {
          return res.status(401).json({
            message: "Voce nao tem autorização para editar esse post!",
            success: false,
          });
        }

        await trx("Post").where("id", id).update({ text_post });
        await trx.commit();
        return res
          .status(200)
          .json({ message: "Post editado com sucesso!", success: true });
      } catch (error) {
        await trx.rollback();
        return res.status(500).json({
          message: "Um Erro inesperado aconteceu! Tente novamente",
          success: false,
        });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Nao foi recebido todos os campos!", success: false });
    }
  }
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { token } = req.headers;

    const trx = await knex.transaction();

    if (token && id) {
      try {
        const data_user = await trx("User")
          .where("token_challenger", token)
          .select("id")
          .first();
        const data_post = await trx("Post")
          .where("id", data_user.id)
          .select("user_id")
          .first();
        await trx.commit();

        if (data_user.id != data_post.user_id) {
          return res.status(401).json({
            message: "Voce nao tem autorização para deletar esse post!",
            success: false,
          });
        }
        await trx("Post").where("id", id).delete();
        await trx.commit();
        return res
          .status(200)
          .json({ message: "Post deletado com sucesso!", success: true });
      } catch (error) {
        await trx.rollback();
        return res.status(500).json({
          message: "Um Erro inesperado aconteceu! Tente novamente",
          success: false,
        });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Nao foi recebido todos os campos!", success: false });
    }
  }
}

export default ControllerPost;
