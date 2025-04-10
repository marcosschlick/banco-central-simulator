import express from "express";
import { contaRoutes } from "./routes/ContaRoutes.js";
import { instituicaoRoutes } from "./routes/InstituicaoRoutes.js";
import { transacaoRoutes } from "./routes/TransacaoRoutes.js";
import { usuarioRoutes } from "./routes/UsuarioRoutes.js";

const app = express();
app.use(express.json());
app.use("/contas", contaRoutes);
app.use("/instituicoes", instituicaoRoutes);
app.use("/transacoes", transacaoRoutes);
app.use("/usuarios", usuarioRoutes);

export default app;
