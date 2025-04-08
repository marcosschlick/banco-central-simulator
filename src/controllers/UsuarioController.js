import { UsuarioRepositoryMemory } from "../repositories-memory/UsuarioRepositoryMemory.js";

export class UsuarioController {
  constructor() {
    this.repository = new UsuarioRepositoryMemory();
  }

  criar = async (req, res) => {
    try {
      const usuarioCriado = await this.repository.criar(req.body);
      res.status(201).json(usuarioCriado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const usuario = await this.repository.buscarPorId(req.params.id);
      res.status(200).json(usuario);
    } catch (error) {
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  };

  listar = (req, res) => {
    const usuarios = this.repository.listar();
    res.status(200).json(usuarios);
  };

  atualizar = async (req, res) => {
    try {
      const usuarioAtualizado = await this.repository.atualizar(
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
      await this.repository.remover(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  };
}
