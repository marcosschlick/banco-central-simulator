import TransacaoRepository from "../repositories/TransacaoRepository.js";

export default class TransacaoService {
  constructor() {
    this.transacaoRepository = new TransacaoRepository();
  }

  async criar(conta) {
    return await this.transacaoRepository.criar(conta);
  }

  async buscarPorId(id) {
    return await this.transacaoRepository.buscarPorId(id);
  }

  async listar() {
    return await this.transacaoRepository.listar();
  }

  async atualizar(id, dadosAtualizados) {
    return await this.transacaoRepository.atualizar(id, dadosAtualizados);
  }

  async remover(id) {
    await this.transacaoRepository.remover(id);
  }
}
