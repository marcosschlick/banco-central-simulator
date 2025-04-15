import TransacaoRepository from "../repositories/TransacaoRepository.js";
import InstituicaoRepository from "../repositories/InstituicaoRepository.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js";
import ContaRepository from "../repositories/ContaRepository.js";

export default class TransacaoService {
  constructor() {
    this.instituicaoRepository = new InstituicaoRepository();
    this.contaRepository = new ContaRepository();
    this.usuarioRepository = new UsuarioRepository();
    this.transacaoRepository = new TransacaoRepository();
  }

  async criar(conta) {
    return await this.transacaoRepository.criar(conta);
  }

  async buscarPorUsuario(usuario_id) {
    const { nome } = await this.usuarioRepository.buscarNomePorId(usuario_id);
    const contas = await this.contaRepository.buscarIdPorUsuario(usuario_id);
    const transacoes = await this.transacaoRepository.buscarPorUsuario(
      contas.map((c) => c.id),
    );

    return {
      nome: nome,
      transacoes,
    };
  }

  async buscarPorInstituicao(usuario_id, instituicao) {
    const { nome } = await this.usuarioRepository.buscarNomePorId(usuario_id);
    const { id: instituicao_id } =
      await this.instituicaoRepository.buscarIdPorNome(instituicao);
    const contas = await this.contaRepository.buscarIdPorUsuario(usuario_id);

    const transacoes = await this.transacaoRepository.buscarPorUsuario(
      contas
        .filter((a) => a.instituicao_id === instituicao_id)
        .map((c) => c.id),
    );

    return {
      nome: nome,
      transacoes,
    };
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
