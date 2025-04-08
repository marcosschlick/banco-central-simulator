import { DatabaseMemory } from "../database/database-memory.js";

export class UsuarioRepositoryMemory {
  constructor() {
    this.database = new DatabaseMemory();
  }

  criar(usuario) {
    const id = this.database.inserirUsuario(usuario);
    return { ...usuario, id };
  }

  buscarPorId(id) {
    return this.database.buscarUsuarioPorId(id);
  }

  listar() {
    return this.database.listarUsuarios();
  }

  atualizar(id, usuario) {
    return this.database.atualizarUsuario(id, usuario);
  }

  remover(id) {
    this.database.removerUsuario(id);
  }
}
