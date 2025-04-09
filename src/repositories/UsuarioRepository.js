import connection from "../database/database.js";

export class UsuarioRepository {
  async criar(usuario) {
    const [usuarioCriado] = await connection("usuario")
      .insert(usuario)
      .returning("*");
    return usuarioCriado;
  }

  async buscarPorId(id) {
    return connection("usuario").where({ id }).first();
  }

  async listar() {
    return connection("usuario").select("*");
  }

  async atualizar(id, dadosAtualizados) {
    const [usuarioAtualizado] = await connection("usuario")
      .where({ id })
      .update(dadosAtualizados)
      .returning("*");
    return usuarioAtualizado;
  }

  async remover(id) {
    await connection("usuario").where({ id }).del();
  }
}
