import "../../models/index.js";
import seedUsuarios from "./initialUsuario.js";
import seedInstituicoes from "./initialInstituicao.js";
import seedContas from "./initialConta.js";

async function runAllSeeds() {
  try {
    await seedInstituicoes();
    await seedUsuarios();
    await seedContas();

    console.log("Todos seeds executados com sucesso!");
  } catch (error) {
    console.error("Erro ao executar seeds:", error);
  } finally {
    process.exit(0);
  }
}

runAllSeeds();
