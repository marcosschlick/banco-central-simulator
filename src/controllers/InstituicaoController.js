import { InstituicaoRepository } from "../repositories/InstituicaoRepository.js";

export class InstituicaoController {
  constructor() {
    this.repository = new InstituicaoRepository();
  }

  criar = async (req, res) => {
    try {
      const instituicaoCriada = await this.repository.criar(req.body);
      res.status(201).json(instituicaoCriada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const instituicao = await this.repository.buscarPorId(req.params.id);
      res.status(200).json(instituicao);
    } catch (error) {
      res.status(404).json({ error: "Instituição não encontrada" });
    }
  };

  listar = async (req, res) => {
    const instituicoes = await this.repository.listar();
    res.status(200).json(instituicoes);
  };

  atualizar = async (req, res) => {
    try {
      const instituicaoAtualizada = await this.repository.atualizar(
        req.params.id,
        req.body,
      );
      res.status(200).json(instituicaoAtualizada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  remover = async (req, res) => {
    try {
      await this.repository.remover(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: "Instituição não encontrada" });
    }
  };
}
