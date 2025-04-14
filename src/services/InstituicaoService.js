import InstituicaoRepository from "../repositories/InstituicaoRepository.js";

export default class InstituicaoService {
  constructor() {
    this.instituicaoRepository = new InstituicaoRepository();
  }

  async criar(conta) {
    return await this.instituicaoRepository.criar(conta);
  }

  async buscarPorId(id) {
    return await this.instituicaoRepository.buscarPorId(id);
  }

  async listar() {
    return await this.instituicaoRepository.listar();
  }

  async atualizar(id, dadosAtualizados) {
    return await this.instituicaoRepository.atualizar(id, dadosAtualizados);
  }

  async remover(id) {
    await this.instituicaoRepository.remover({ where: { id } });
  }
}
