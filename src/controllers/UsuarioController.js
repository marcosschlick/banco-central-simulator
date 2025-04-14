import UsuarioService from "../services/UsuarioService.js";

export default class UsuarioController {
  constructor() {
    this.usuarioService = new UsuarioService();
  }

  criar = async (req, res) => {
    try {
      const usuarioCriado = await this.usuarioService.criar(req.body);
      res.status(201).json(usuarioCriado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const usuario = await this.usuarioService.buscarPorId(req.params.id);
      res.status(200).json(usuario);
    } catch (error) {
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  };

  listar = async (req, res) => {
    const usuarios = await this.usuarioService.listar();
    res.status(200).json(usuarios);
  };

  atualizar = async (req, res) => {
    try {
      const usuarioAtualizado = await this.usuarioService.atualizar(
        req.params.id,
        req.body,
      );
      res.status(200).json(usuarioAtualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  remover = async (req, res) => {
    try {
      await this.usuarioService.remover(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  };
}
