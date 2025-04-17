import express from "express";
import { accountRoutes } from "./routes/AccountRoutes.js";
import { institutionRoutes } from "./routes/InstitutionRoutes.js";
import { transactionRoutes } from "./routes/TransactionRoutes.js";
import { userRoutes } from "./routes/UserRoutes.js";

const app = express();
app.use(express.json());

app.use("/accounts", accountRoutes);
app.use("/institutions", institutionRoutes);
app.use("/transactions", transactionRoutes);
app.use("/users", userRoutes);

export default app;
