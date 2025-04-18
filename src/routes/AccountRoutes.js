import express from "express";
import AccountController from "../app/controllers/AccountController.js";

const router = express.Router();

const accountController = new AccountController();

// account routes
router.post("", accountController.create);
router.get("/id/:accountId", accountController.findById);
router.get("/user/:userId", accountController.findByUserId);
router.get("", accountController.findAll);
router.put("/:accountId", accountController.update);
router.delete("/:accountId", accountController.delete);

export { router as accountRoutes };
