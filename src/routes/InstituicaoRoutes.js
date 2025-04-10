import express from "express";
import { InstituicaoController } from "../controllers/InstituicaoController.js";

const router = express.Router();

const instituicaoController = new InstituicaoController();

router.post("", instituicaoController.criar);
router.get("/:id", instituicaoController.buscarPorId);
router.get("", instituicaoController.listar);
router.put("/:id", instituicaoController.atualizar);
router.delete("/:id", instituicaoController.remover);

export { router as instituicaoRoutes };
