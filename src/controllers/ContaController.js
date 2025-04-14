import ContaService from "../services/ContaService.js";

export default class ContaController {
  constructor() {
    this.contaService = new ContaService();
  }

  criar = async (req, res) => {
    try {
      const contaCriada = await this.contaService.criar(req.body);
      console.log(contaCriada);
      res.status(201).json(contaCriada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const conta = await this.contaService.buscarPorId(req.params.id);
      res.status(200).json(conta);
    } catch (error) {
      res.status(404).json({ error: "Conta não encontrada" });
    }
  };

  listar = async (req, res) => {
    const contas = await this.contaService.listar();
    res.status(200).json(contas);
  };

  atualizar = async (req, res) => {
    try {
      const contaAtualizada = await this.contaService.atualizar(
        req.params.id,
        req.body,
      );
      res.status(200).json(contaAtualizada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  remover = async (req, res) => {
    try {
      await this.contaService.remover(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: "Conta não encontrada" });
    }
  };
}
