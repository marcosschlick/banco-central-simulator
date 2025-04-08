import { DatabaseMemory } from "../database/database-memory.js";

export class TransacaoRepositoryMemory {
  constructor() {
    this.database = new DatabaseMemory();
  }

  criar(transacao) {
    const id = this.database.inserirTransacao(transacao);
    return { ...transacao, id };
  }

  buscarPorId(id) {
    return this.database.buscarTransacaoPorId(id);
  }

  listar() {
    return this.database.listarTransacoes();
  }

  atualizar(id, transacao) {
    return this.database.atualizarTransacao(id, transacao);
  }

  remover(id) {
    this.database.removerTransacao(id);
  }
}
