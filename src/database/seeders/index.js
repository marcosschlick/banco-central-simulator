import "../../app/models/index.js";
import seedAccounts from "./initialAccount.js";
import seedInstitutions from "./initialInstitution.js";
import seedUsers from "./initialUser.js";

async function runAllSeeds() {
  try {
    await seedInstitutions();
    await seedUsers();
    await seedAccounts();

    console.log("All seeds executed successfully!");
  } catch (error) {
    console.error("Error running seeds:", error);
  } finally {
    process.exit(0);
  }
}

runAllSeeds();
