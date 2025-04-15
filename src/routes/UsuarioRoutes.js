import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";
import ContaController from "../controllers/ContaController.js";

const router = express.Router();

const usuarioController = new UsuarioController();
const contaController = new ContaController();

router.post("", usuarioController.criar);
router.get("/:id", usuarioController.buscarPorId);
router.get("", usuarioController.listar);
router.put("/:id", usuarioController.atualizar);
router.delete("/:id", usuarioController.remover);

router.post("/:id/contas", contaController.criarComId);
router.get("/:id/saldo", contaController.buscarSaldoTotal);
router.get("/:id/saldos", contaController.buscarSaldos);

export { router as usuarioRoutes };
