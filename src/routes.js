import express from "express";
import { ContaController } from "./controllers/ContaController.js";
import { UsuarioController } from "./controllers/UsuarioController.js";
import { InstituicaoController } from "./controllers/InstituicaoController.js";
import { TransacaoController } from "./controllers/TransacaoController.js";

const router = express.Router();

const contaController = new ContaController();
const usuarioController = new UsuarioController();
const instituicaoController = new InstituicaoController();
const transacaoController = new TransacaoController();

// rotas para contas
router.post("/contas", contaController.criar);
router.get("/contas/:id", contaController.buscarPorId);
router.get("/contas", contaController.listar);
router.put("/contas/:id", contaController.atualizar);
router.delete("/contas/:id", contaController.remover);

// rotas para usuários
router.post("/usuarios", usuarioController.criar);
router.get("/usuarios/:id", usuarioController.buscarPorId);
router.get("/usuarios", usuarioController.listar);
router.put("/usuarios/:id", usuarioController.atualizar);
router.delete("/usuarios/:id", usuarioController.remover);

// rotas para instituições
router.post("/instituicoes", instituicaoController.criar);
router.get("/instituicoes/:id", instituicaoController.buscarPorId);
router.get("/instituicoes", instituicaoController.listar);
router.put("/instituicoes/:id", instituicaoController.atualizar);
router.delete("/instituicoes/:id", instituicaoController.remover);

// rotas para transações
router.post("/transacoes", transacaoController.criar);
router.get("/transacoes/:id", transacaoController.buscarPorId);
router.get("/transacoes", transacaoController.listar);
router.put("/transacoes/:id", transacaoController.atualizar);
router.delete("/transacoes/:id", transacaoController.remover);

export default router;
