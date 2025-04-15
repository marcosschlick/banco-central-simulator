import TransacaoService from "../services/TransacaoService.js";

export default class TransacaoController {
  constructor() {
    this.transacaoService = new TransacaoService();
  }

  criar = async (req, res) => {
    try {
      const transacaoCriada = await this.transacaoService.criar(req.body);
      res.status(201).json(transacaoCriada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const transacao = await this.transacaoService.buscarPorId(req.params.id);
      res.status(200).json(transacao);
    } catch (error) {
      res.status(404).json({ error: "Transação não encontrada" });
    }
  };

  buscarPorUsuario = async (req, res) => {
    try {
      const transacao = await this.transacaoService.buscarPorUsuario(
        req.params.id,
      );
      res.status(200).json(transacao);
    } catch (error) {
      res.status(404).json({ error: "Transação não encontrada" });
    }
  };

  buscarPorInstituicao = async (req, res) => {
    try {
      const transacoes = await this.transacaoService.buscarPorInstituicao(
        req.params.id,
        req.query.instituicao,
      );
      res.status(200).json(transacoes);
    } catch (error) {
      res.status(404).json({ error: "Transação não encontrada" });
    }
  };

  listar = async (req, res) => {
    const transacoes = await this.transacaoService.listar();
    res.status(200).json(transacoes);
  };

  atualizar = async (req, res) => {
    try {
      const transacaoAtualizada = await this.transacaoService.atualizar(
        req.params.id,
        req.body,
      );
      res.status(200).json(transacaoAtualizada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  remover = async (req, res) => {
    try {
      await this.transacaoService.remover(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: "Transação não encontrada" });
    }
  };
}
