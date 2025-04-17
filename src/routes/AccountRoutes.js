import express from "express";
import AccountController from "../app/controllers/AccountController.js";

const router = express.Router();

const accountController = new AccountController();

// Base Account routes
router.post("", accountController.create);
router.get("/:accountId", accountController.getById);
router.get("/:accountId/user", accountController.getByUser);
router.get("", accountController.getAll);
router.put("/:accountId", accountController.update);
router.delete("/:accountId", accountController.delete);

export { router as accountRoutes };
