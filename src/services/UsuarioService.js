import UsuarioRepository from "../repositories/UsuarioRepository.js";

export default class UsuarioService {
  constructor() {
    this.usuarioRepository = new UsuarioRepository();
  }

  async criar(conta) {
    return await this.usuarioRepository.criar(conta);
  }

  async buscarPorId(id) {
    return await this.usuarioRepository.buscarPorId(id);
  }

  async listar() {
    return await this.usuarioRepository.listar();
  }

  async atualizar(id, dadosAtualizados) {
    return await this.usuarioRepository.atualizar(id, dadosAtualizados);
  }

  async remover(id) {
    await this.usuarioRepository.remover(id);
  }
}
