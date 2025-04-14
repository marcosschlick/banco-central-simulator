import ContaRepository from "../repositories/ContaRepository.js";

export default class ContaService {
  constructor() {
    this.contaRepository = new ContaRepository();
  }

  async criar(conta) {
    return await this.contaRepository.criar(conta);
  }

  async buscarPorId(id) {
    return await this.contaRepository.buscarPorId(id);
  }

  async listar() {
    return await this.contaRepository.listar();
  }

  async atualizar(id, dadosAtualizados) {
    return await this.contaRepository.atualizar(id, dadosAtualizados);
  }

  async remover(id) {
    await this.contaRepository.remover(id);
  }
}
