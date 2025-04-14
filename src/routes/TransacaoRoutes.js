import express from "express";
import TransacaoController from "../controllers/TransacaoController.js";

const router = express.Router();

const transacaoController = new TransacaoController();

router.post("", transacaoController.criar);
router.get(":id", transacaoController.buscarPorId);
router.get("", transacaoController.listar);
router.put("/:id", transacaoController.atualizar);
router.delete("/:id", transacaoController.remover);

export { router as transacaoRoutes };
