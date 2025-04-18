import express from "express";
import TransactionController from "../app/controllers/TransactionController.js";

const router = express.Router();

const transactionController = new TransactionController();

// transaction routes
router.post("", transactionController.create);
router.get("/:transactionId", transactionController.findById);
router.get("", transactionController.findAll);
router.put("/:transactionId", transactionController.update);
router.delete("/:transactionId", transactionController.delete);

export { router as transactionRoutes };
