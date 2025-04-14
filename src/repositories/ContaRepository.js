import Conta from "../models/Conta.js";

export class ContaRepository {
  async criar(conta) {
    return await Conta.create(conta);
  }

  async buscarPorId(id) {
    return await Conta.findByPk(id);
  }

  async listar() {
    return await Conta.findAll();
  }

  async atualizar(id, dadosAtualizados) {
    await Conta.update(dadosAtualizados, { where: { id } });
    return await Conta.findByPk(id);
  }

  async remover(id) {
    await Conta.destroy({ where: { id } });
  }
}
