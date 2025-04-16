import InstituicaoService from "../services/InstituicaoService.js";

export default class InstituicaoController {
  constructor() {
    this.instituicaoService = new InstituicaoService();
  }

  criar = async (req, res) => {
    try {
      const instituicaoCriada = await this.instituicaoService.criar(req.body);
      res.status(201).json(instituicaoCriada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const instituicao = await this.instituicaoService.buscarPorId(
        req.params.id,
      );
      res.status(200).json(instituicao);
    } catch (error) {
      res.status(404).json({ error: "Instituição não encontrada" });
    }
  };

  listar = async (req, res) => {
    const instituicoes = await this.instituicaoService.listar();
    res.status(200).json(instituicoes);
  };

  atualizar = async (req, res) => {
    try {
      const instituicaoAtualizada = await this.instituicaoService.atualizar(
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
      await this.instituicaoService.remover(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: "Instituição não encontrada" });
    }
  };
}
