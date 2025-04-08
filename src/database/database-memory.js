import { randomUUID } from "node:crypto";
import { validate as uuidValidate } from "uuid";

export class DatabaseMemory {
  #contas = new Map();
  #instituicoes = new Map();
  #transacoes = new Map();
  #usuarios = new Map();

  #gerarOuValidarId(entidade) {
    if (!entidade.id || !uuidValidate(entidade.id)) {
      entidade.id = randomUUID();
    }
    return entidade.id;
  }

  // inserir
  inserirConta(conta) {
    const id = this.#gerarOuValidarId(conta);
    this.#contas.set(id, conta);
    return id;
  }

  inserirInstituicao(instituicao) {
    const id = this.#gerarOuValidarId(instituicao);
    this.#instituicoes.set(id, instituicao);
    return id;
  }

  inserirTransacao(transacao) {
    const id = this.#gerarOuValidarId(transacao);
    this.#transacoes.set(id, transacao);
    return id;
  }

  inserirUsuario(usuario) {
    const id = this.#gerarOuValidarId(usuario);
    this.#usuarios.set(id, usuario);
    return id;
  }

  // buscar por id
  buscarContaPorId(id) {
    const conta = this.#contas.get(id);
    if (!conta) throw new Error("Conta não encontrada");
    return conta;
  }

  buscarInstituicaoPorId(id) {
    const instituicao = this.#instituicoes.get(id);
    if (!instituicao) throw new Error("Instituição não encontrada");
    return instituicao;
  }

  buscarTransacaoPorId(id) {
    const transacao = this.#transacoes.get(id);
    if (!transacao) throw new Error("Transação não encontrada");
    return transacao;
  }

  buscarUsuarioPorId(id) {
    const usuario = this.#usuarios.get(id);
    if (!usuario) throw new Error("Usuário não encontrado");
    return usuario;
  }

  // listar todos
  listarContas() {
    return Array.from(this.#contas.values());
  }

  listarInstituicoes() {
    return Array.from(this.#instituicoes.values());
  }

  listarTransacoes() {
    return Array.from(this.#transacoes.values());
  }

  listarUsuarios() {
    return Array.from(this.#usuarios.values());
  }

  // atualizar
  atualizarConta(id, novosDados) {
    const contaAntiga = this.buscarContaPorId(id);
    const contaAtualizada = { ...contaAntiga, ...novosDados };
    this.#contas.set(id, contaAtualizada);
    return contaAtualizada;
  }

  atualizarInstituicao(id, novosDados) {
    const instituicaoAntiga = this.buscarInstituicaoPorId(id);
    const instituicaoAtualizada = { ...instituicaoAntiga, ...novosDados };
    this.#instituicoes.set(id, instituicaoAtualizada);
    return instituicaoAtualizada;
  }

  atualizarTransacao(id, novosDados) {
    const transacaoAntiga = this.buscarTransacaoPorId(id);
    const transacaoAtualizada = { ...transacaoAntiga, ...novosDados };
    this.#transacoes.set(id, transacaoAtualizada);
    return transacaoAtualizada;
  }

  atualizarUsuario(id, novosDados) {
    const usuarioAntigo = this.buscarUsuarioPorId(id);
    const usuarioAtualizado = { ...usuarioAntigo, ...novosDados };
    this.#usuarios.set(id, usuarioAtualizado);
    return usuarioAtualizado;
  }

  // deleter
  removerConta(id) {
    this.buscarContaPorId(id);
    this.#contas.delete(id);
  }

  removerInstituicao(id) {
    this.buscarInstituicaoPorId(id);
    this.#instituicoes.delete(id);
  }

  removerTransacao(id) {
    this.buscarTransacaoPorId(id);
    this.#transacoes.delete(id);
  }

  removerUsuario(id) {
    this.buscarUsuarioPorId(id);
    this.#usuarios.delete(id);
  }
}
