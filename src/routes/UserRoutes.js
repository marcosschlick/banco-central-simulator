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

// account routes
router.post("/:userId/accounts", accountController.createByUserId);
router.get("/:userId/balances", accountController.findBalances);
router.get(
  "/:userId/balance/total",
  accountController.findTotalBalanceByUserId,
);
router.get("/:userId/balance", accountController.findBalanceByInstitution);

// transaction routes
router.get("/:userId/transactions", transactionController.findByUserId);
router.get("/:userId/transaction", transactionController.findByInstitution);
router.post(
  "/:userId/transactions",
  transactionController.processTransactionByInstitution,
);

export { router as userRoutes };
