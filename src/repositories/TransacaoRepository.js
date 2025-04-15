import Transacao from "../models/Transacao.js";
import { Op } from "sequelize";

export default class TransacaoRepository {
  async criar(conta) {
    return await Transacao.create(conta);
  }

  async buscarPorUsuario(conta_ids) {
    return await Transacao.findAll({
      where: {
        conta_id: { [Op.in]: conta_ids },
      },
    });
  }

  async buscarPorId(id) {
    return await Transacao.findByPk(id);
  }

  async listar() {
    return await Transacao.findAll();
  }

  async atualizar(id, dadosAtualizados) {
    await Transacao.update(dadosAtualizados, { where: { id } });
    return await Transacao.findByPk(id);
  }

  async remover(id) {
    await Transacao.destroy({ where: { id } });
  }
}
