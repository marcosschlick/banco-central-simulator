import Transacao from "../models/Transacao.js";

export default class TransacaoRepository {
  async criar(conta) {
    return await Transacao.create(conta);
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
