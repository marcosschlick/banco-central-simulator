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

  async debitarComInstituicao(id, dados, instituicao) {
    const contas = await this.contaRepository.buscarPorUsuario(id);
    const valor = dados.valor;
    const { id: instituicao_id } =
      await this.instituicaoRepository.buscarIdPorNome(instituicao);

    if (!instituicao_id) {
      throw new Error("Instituição não encontrada");
    }

    const conta = contas.find((a) => a.instituicao_id === instituicao_id);

    if (!conta) {
      throw new Error("Conta na instituição especificada não encontrada");
    }
    const transacao = {
      conta_origem: conta.id,
      valor: dados.valor,
      tipo: dados.tipo,
      conta_destino: dados.conta_destino,
    };

    if (conta.saldo >= valor) {
      await this.contaRepository.pagarDebito(conta.id, valor);
      await this.contaRepository.receber(dados.conta_destino, valor);
      return await this.transacaoRepository.criar(transacao);
    } else {
      throw new Error("Saldo insuficiente");
    }
  }

  async creditarComInstituicao(id, dados, instituicao) {
    const contas = await this.contaRepository.buscarPorUsuario(id);
    const valor = dados.valor;
    const { id: instituicao_id } =
      await this.instituicaoRepository.buscarIdPorNome(instituicao);

    if (!instituicao_id) {
      throw new Error("Instituição não encontrada");
    }

    const conta = contas.find((a) => a.instituicao_id === instituicao_id);

    if (!conta) {
      throw new Error("Conta na instituição especificada não encontrada");
    }
    const transacao = {
      conta_origem: conta.id,
      valor: dados.valor,
      tipo: dados.tipo,
      conta_destino: dados.conta_destino,
    };

    if (conta.credito_disponivel >= valor) {
      await this.contaRepository.pagarCredito(conta.id, valor);
      await this.contaRepository.receber(dados.conta_destino, valor);
      return await this.transacaoRepository.criar(transacao);
    } else {
      throw new Error("credito insuficiente");
    }
  }
}
