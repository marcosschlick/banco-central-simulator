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

  findById = async (req, res) => {
    try {
      const transaction = await this.transactionService.findById(
        req.params.transactionId,
      );
      res.status(200).json(transaction);
    } catch (error) {
      res
        .status(error.message.includes("not found") ? 404 : 500)
        .json({ error: error.message });
    }
  };

  findAll = async (req, res) => {
    try {
      const transactions = await this.transactionService.findAll();
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
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
      const status = error.message.includes("not found") ? 404 : 400;
      res.status(status).json({ error: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      await this.transactionService.delete(req.params.transactionId);
      res.status(204).send();
    } catch (error) {
      const status = error.message.includes("not found") ? 404 : 500;
      res.status(status).json({ error: error.message });
    }
  };

  findByUserId = async (req, res) => {
    try {
      const transactions = await this.transactionService.findByUserId(
        req.params.userId,
      );
      res.status(200).json(transactions);
    } catch (error) {
      res.status(404).json({ error: "No transactions found" });
    }
  };

  findByInstitution = async (req, res) => {
    try {
      const transactions = await this.transactionService.findByInstitution(
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
}
