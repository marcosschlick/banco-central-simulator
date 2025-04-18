import express from "express";
import UserController from "../app/controllers/UserController.js";
import AccountController from "../app/controllers/AccountController.js";
import TransactionController from "../app/controllers/TransactionController.js";

const router = express.Router();

const userController = new UserController();
const accountController = new AccountController();
const transactionController = new TransactionController();

// user routes
router.post("", userController.create);
router.get("/id/:userId", userController.findById);
router.get("/cpf/:userCpf", userController.findByCpf);
router.get("", userController.findAll);
router.put("/:userId", userController.update);
router.delete("/:userId", userController.delete);

// Nested account routes
router.post("/:userId/accounts", accountController.createById);
router.get("/:userId/balance/total", accountController.getTotalBalance);
router.get("/:userId/balance", accountController.getBalanceByInstitution);
router.get("/:userId/balances", accountController.getBalances);

// Nested transaction routes
router.get("/:userId/transactions", transactionController.getUserTransactions);
router.get(
  "/:userId/transaction",
  transactionController.getUserTransactionsByInstitution,
);
router.post(
  "/:userId/transactions/process",
  transactionController.processTransactionByInstitution,
);

export { router as userRoutes };
