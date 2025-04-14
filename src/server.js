import app from "./app.js";
import "dotenv/config";
import "./models/index.js";

const PORT = process.env.SV_PORT;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
