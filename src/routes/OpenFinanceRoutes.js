import express from "express";
import OpenFinanceController from "../app/controllers/OpenFinanceController.js";

const router = express.Router();

const openFinanceController = new OpenFinanceController();

// open finance routes
router.post("/", openFinanceController.createAuthorization);
router.patch("/:action", openFinanceController.updateAuthorization);
router.get("/", openFinanceController.getBalance);
router.post("/transaction", openFinanceController.createTransaction);

export { router as openFinanceRoutes };
