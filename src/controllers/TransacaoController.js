import { TransacaoRepositoryMemory } from "../repositories-memory/TransacaoRepositoryMemory.js";

export class TransacaoController {
  constructor() {
    this.repository = new TransacaoRepositoryMemory();
  }

  criar = async (req, res) => {
    try {
      const transacaoCriada = await this.repository.criar(req.body);
      res.status(201).json(transacaoCriada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const transacao = await this.repository.buscarPorId(req.params.id);
      res.status(200).json(transacao);
    } catch (error) {
      res.status(404).json({ error: "Transação não encontrada" });
    }
  };

  listar = (req, res) => {
    const transacoes = this.repository.listar();
    res.status(200).json(transacoes);
  };

  atualizar = async (req, res) => {
    try {
      const transacaoAtualizada = await this.repository.atualizar(
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
      await this.repository.remover(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: "Transação não encontrada" });
    }
  };
}
