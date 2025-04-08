import { DatabaseMemory } from "../database/database-memory.js";

export class ContaRepositoryMemory {
  constructor() {
    this.database = new DatabaseMemory();
  }

  criar(conta) {
    const id = this.database.inserirConta(conta);
    return { ...conta, id };
  }

  buscarPorId(id) {
    return this.database.buscarContaPorId(id);
  }

  listar() {
    return this.database.listarContas();
  }

  atualizar(id, conta) {
    return this.database.atualizarConta(id, conta);
  }

  remover(id) {
    this.database.removerConta(id);
  }
}
