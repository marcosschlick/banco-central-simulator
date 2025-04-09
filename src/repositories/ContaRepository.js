import connection from "../database/database.js";

export class ContaRepository {
  async criar(conta) {
    const [contaCriada] = await connection("conta")
      .insert(conta)
      .returning("*");
    return contaCriada;
  }

  async buscarPorId(id) {
    return connection("conta").where({ id }).first();
  }

  async listar() {
    return connection("conta").select("*");
  }

  async atualizar(id, dadosAtualizados) {
    const [contaAtualizada] = await connection("conta")
      .where({ id })
      .update(dadosAtualizados)
      .returning("*");
    return contaAtualizada;
  }

  async remover(id) {
    await connection("conta").where({ id }).del();
  }
}
