import express from "express";
import { openFinanceRoutes } from "./routes/OpenFinanceRoutes.js";

const app = express();
app.use(express.json());

app.use("/openfinance", openFinanceRoutes);

export default app;
