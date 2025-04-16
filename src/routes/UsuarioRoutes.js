import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";
import ContaController from "../controllers/ContaController.js";
import TransacaoController from "../controllers/TransacaoController.js";

const router = express.Router();

const usuarioController = new UsuarioController();
const contaController = new ContaController();
const transacaoController = new TransacaoController();

router.post("", usuarioController.criar);
router.get("/:id", usuarioController.buscarPorId);
router.get("", usuarioController.listar);
router.put("/:id", usuarioController.atualizar);
router.delete("/:id", usuarioController.remover);

router.post("/:id/contas", contaController.criarComId);
router.get("/:id/total", contaController.buscarSaldoTotal);
router.get("/:id/saldo", contaController.buscarSaldoPorInstituicao);
router.get("/:id/saldos", contaController.buscarSaldos);
router.get("/:id/extratos", transacaoController.buscarPorUsuario);
router.get("/:id/extrato", transacaoController.buscarPorInstituicao);
router.post("/:id/transacoes", transacaoController.movimentar);

export { router as usuarioRoutes };
