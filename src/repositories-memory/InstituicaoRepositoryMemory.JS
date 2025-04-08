import { DatabaseMemory } from "../database/database-memory.js";

export class InstituicaoRepositoryMemory {
  constructor() {
    this.database = new DatabaseMemory();
  }

  criar(instituicao) {
    const id = this.database.inserirInstituicao(instituicao);
    return { ...instituicao, id };
  }

  buscarPorId(id) {
    return this.database.buscarInstituicaoPorId(id);
  }

  listar() {
    return this.database.listarInstituicoes();
  }

  atualizar(id, instituicao) {
    return this.database.atualizarInstituicao(id, instituicao);
  }

  remover(id) {
    this.database.removerInstituicao(id);
  }
}
