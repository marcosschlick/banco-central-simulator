import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";

const router = express.Router();

const usuarioController = new UsuarioController();

router.post("", usuarioController.criar);
router.get("/:id", usuarioController.buscarPorId);
router.get("", usuarioController.listar);
router.put("/:id", usuarioController.atualizar);
router.delete("/:id", usuarioController.remover);

export { router as usuarioRoutes };
