import ContaRepository from "../repositories/ContaRepository.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js";
import InstituicaoRepository from "../repositories/InstituicaoRepository.js";

export default class ContaService {
  constructor() {
    this.contaRepository = new ContaRepository();
    this.usuarioRepository = new UsuarioRepository();
    this.instituicaoRepository = new InstituicaoRepository();
  }

  async criar(conta) {
    return await this.contaRepository.criar(conta);
  }

  async buscarPorId(id) {
    return await this.contaRepository.buscarPorId(id);
  }

  async buscarPorUsuario(usuario_id) {
    return await this.contaRepository.buscarPorUsuario(usuario_id);
  }

  async buscarSaldos(usuario_id) {
    const { nome } = await this.usuarioRepository.buscarNomePorId(usuario_id);
    const saldos = await this.contaRepository.buscarSaldoPorUsuario(usuario_id);
    const resultados = [];

    for (const item of saldos) {
      const { nome: instituicao } =
        await this.instituicaoRepository.buscarNomePorId(item.instituicao_id);
      resultados.push({
        nome,
        saldo: item.saldo,
        instituicao,
      });
    }
    return resultados;
  }

  async buscarSaldoTotal(usuario_id) {
    const { nome } = await this.usuarioRepository.buscarNomePorId(usuario_id);
    const contas = await this.contaRepository.buscarSaldoPorUsuario(usuario_id);

    const soma = contas.reduce(
      (total, conta) => total + parseFloat(conta.saldo),
      0,
    );

    return {
      nome,
      "saldo total": soma,
    };
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
