import Usuario from "../models/Usuario.js";

export default class UsuarioRepository {
  async criar(conta) {
    return await Usuario.create(conta);
  }

  async buscarPorId(id) {
    return await Usuario.findByPk(id);
  }

  async buscarNomePorId(id) {
    return await Usuario.findOne({
      where: { id },
      attributes: ["nome"],
    });
  }

  async listar() {
    return await Usuario.findAll();
  }

  async atualizar(id, dadosAtualizados) {
    await Usuario.update(dadosAtualizados, { where: { id } });
    return await Usuario.findByPk(id);
  }

  async remover(id) {
    await Usuario.destroy({ where: { id } });
  }
}
