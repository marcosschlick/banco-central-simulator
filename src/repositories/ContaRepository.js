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

  async buscarIdPorUsuario(usuario_id) {
    return await Conta.findAll({
      where: { usuario_id },
      attributes: ["id", "instituicao_id"],
    });
  }

  async buscarSaldoPorUsuario(usuario_id) {
    return await Conta.findAll({
      where: { usuario_id },
      attributes: [
        "saldo",
        "instituicao_id",
        "credito_limite",
        "credito_disponivel",
      ],
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

  async receber(id, valor) {
    if (
      id === null ||
      id === undefined ||
      valor === null ||
      valor === undefined
    ) {
      return;
    }

    const conta = await Conta.findByPk(id);
    if (!conta) {
      throw new Error("Conta não encontrada");
    }
    const novoSaldo = Number(conta.saldo) + Number(valor);
    await Conta.update({ saldo: novoSaldo }, { where: { id } });
    return await Conta.findByPk(id);
  }

  async pagarDebito(id, valor) {
    const conta = await Conta.findByPk(id);
    if (!conta) {
      throw new Error("Conta não encontrada");
    }
    const novoSaldo = parseFloat(conta.saldo) - parseFloat(valor);
    await Conta.update({ saldo: novoSaldo }, { where: { id } });
    return await Conta.findByPk(id);
  }

  async pagarCredito(id, valor) {
    const conta = await Conta.findByPk(id);
    if (!conta) {
      throw new Error("Conta não encontrada");
    }
    const novoCredito =
      parseFloat(conta.credito_disponivel) - parseFloat(valor);
    await Conta.update({ credito_disponivel: novoCredito }, { where: { id } });
    return await Conta.findByPk(id);
  }

  async remover(id) {
    await Conta.destroy({ where: { id } });
  }
}
