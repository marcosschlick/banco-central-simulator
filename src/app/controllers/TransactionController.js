import TransactionService from "../services/TransactionService.js";

export default class TransactionController {
  constructor() {
    this.transactionService = new TransactionService();
  }

  create = async (req, res) => {
    try {
      const transaction = await this.transactionService.create(req.body);
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getById = async (req, res) => {
    try {
      const transaction = await this.transactionService.findById(
        req.params.transactionId,
      );
      res.status(200).json(transaction);
    } catch (error) {
      res.status(404).json({ error: "Transaction not found" });
    }
  };

  getAll = async (req, res) => {
    const transactions = await this.transactionService.listAll();
    res.status(200).json(transactions);
  };

  getUserTransactions = async (req, res) => {
    try {
      const transactions = await this.transactionService.getUserTransactions(
        req.params.userId,
      );
      res.status(200).json(transactions);
    } catch (error) {
      res.status(404).json({ error: "No transactions found" });
    }
  };

  getUserTransactionsByInstitution = async (req, res) => {
    try {
      const transactions =
        await this.transactionService.getUserTransactionsByInstitution(
          req.params.userId,
          req.query.institution,
        );
      res.status(200).json(transactions);
    } catch (error) {
      res.status(404).json({ error: "No transactions found" });
    }
  };

  processTransactionByInstitution = async (req, res) => {
    try {
      const result =
        await this.transactionService.processTransactionByInstitution(
          req.params.userId,
          req.body,
          req.query.institution,
        );
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req, res) => {
    try {
      const updatedTransaction = await this.transactionService.update(
        req.params.transactionId,
        req.body,
      );
      res.status(200).json(updatedTransaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      await this.transactionService.delete(req.params.transactionId);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: "Transaction not found" });
    }
  };
}
