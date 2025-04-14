import Instituicao from "../models/Instituicao.js";

export class InstituicaoRepository {
  async criar(conta) {
    return await Instituicao.create(conta);
  }

  async buscarPorId(id) {
    return await Instituicao.findByPk(id);
  }

  async listar() {
    return await Instituicao.findAll();
  }

  async atualizar(id, dadosAtualizados) {
    await Instituicao.update(dadosAtualizados, { where: { id } });
    return await Instituicao.findByPk(id);
  }

  async remover(id) {
    await Instituicao.destroy({ where: { id } });
  }
}
