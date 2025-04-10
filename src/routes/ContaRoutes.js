import express from "express";
import { ContaController } from "../controllers/ContaController.js";

const router = express.Router();

const contaController = new ContaController();

router.post("", contaController.criar);
router.get("/:id", contaController.buscarPorId);
router.get("", contaController.listar);
router.put("/:id", contaController.atualizar);
router.delete("/:id", contaController.remover);

export { router as contaRoutes };
