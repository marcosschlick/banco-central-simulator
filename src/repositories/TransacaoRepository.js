import connection from "../database/database.js";

export class TransacaoRepository {
  async criar(transacao) {
    if (!transacao.data) {
      transacao.data = new Date().toISOString();
    }
    const [transacaoCriada] = await connection("transacao")
      .insert(transacao)
      .returning("*");
    return transacaoCriada;
  }

  async buscarPorId(id) {
    return connection("transacao").where({ id }).first();
  }

  async listar() {
    return connection("transacao").select("*");
  }

  async atualizar(id, dadosAtualizados) {
    const [transacaoAtualizada] = await connection("transacao")
      .where({ id })
      .update(dadosAtualizados)
      .returning("*");
    return transacaoAtualizada;
  }

  async remover(id) {
    await connection("transacao").where({ id }).del();
  }
}
