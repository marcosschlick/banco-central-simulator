import app from "./app.js";
import "dotenv/config";
import "./database/index.js";

const PORT = process.env.SV_PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
