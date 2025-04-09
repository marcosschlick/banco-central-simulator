import connection from "../database/database.js";

export class InstituicaoRepository {
  async criar(instituicao) {
    const [instituicaoCriada] = await connection("instituicao")
      .insert(instituicao)
      .returning("*");
    return instituicaoCriada;
  }

  async buscarPorId(id) {
    return connection("instituicao").where({ id }).first();
  }

  async listar() {
    return connection("instituicao").select("*");
  }

  async atualizar(id, dadosAtualizados) {
    const [instituicaoAtualizada] = await connection("instituicao")
      .where({ id })
      .update(dadosAtualizados)
      .returning("*");
    return instituicaoAtualizada;
  }

  async remover(id) {
    await connection("instituicao").where({ id }).del();
  }
}
