import Conta from "../models/Conta.js";

export default class ContaRepository {
  async criar(conta) {
    return await Conta.create(conta);
  }

  async buscarPorId(id) {
    return await Conta.findByPk(id);
  }

  async buscarPorUsuario(usuario_id) {
    return await Conta.findAll({ where: { usuario_id } });
  }

  async buscarSaldoPorUsuario(usuario_id) {
    return await Conta.findAll({
      where: { usuario_id },
      attributes: ["saldo", "instituicao_id"],
    });
  }

  async buscarSaldoPorInstituicao(usuario_id, instituicao_id) {
    return await Conta.findOne({
      where: { usuario_id, instituicao_id },
      attributes: ["saldo"],
    });
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
