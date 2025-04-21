import AccountService from "../services/AccountService.js";

export default class AccountController {
  constructor() {
    this.accountService = new AccountService();
  }

  create = async (req, res) => {
    try {
      const account = await this.accountService.create(req.body);
      res.status(201).json(account);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  createByUserId = async (req, res) => {
    try {
      const account = await this.accountService.create({
        ...req.body,
        user_id: req.params.userId,
      });
      return res.status(201).json(account);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  findById = async (req, res) => {
    try {
      const account = await this.accountService.findById(req.params.accountId);
      res.status(200).json(account);
    } catch (error) {
      res
        .status(error.message.includes("not found") ? 404 : 500)
        .json({ error: error.message });
    }
  };

  findByUserId = async (req, res) => {
    try {
      const accounts = await this.accountService.findByUserId(
        req.params.userId,
      );
      res.status(200).json(accounts);
    } catch (error) {
      res
        .status(error.message.includes("not found") ? 404 : 500)
        .json({ error: error.message });
    }
  };

  findAll = async (req, res) => {
    try {
      const accounts = await this.accountService.findAll();
      res.status(200).json(accounts);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  update = async (req, res) => {
    try {
      const updatedAccount = await this.accountService.update(
        req.params.accountId,
        req.body,
      );
      res.status(200).json(updatedAccount);
    } catch (error) {
      const status = error.message.includes("not found") ? 404 : 400;
      res.status(status).json({ error: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      await this.accountService.delete(req.params.accountId);
      res.status(204).send();
    } catch (error) {
      const status = error.message.includes("not found") ? 404 : 500;
      res.status(status).json({ error: error.message });
    }
  };

  findBalances = async (req, res) => {
    try {
      const balances = await this.accountService.findBalances(
        req.params.userId,
      );
      res.status(200).json(balances);
    } catch (error) {
      res.status(404).json({ error: "User not found" });
    }
  };

  findTotalBalanceByUserId = async (req, res) => {
    try {
      const total = await this.accountService.findTotalBalanceByUserId(
        req.params.userId,
      );
      res.status(200).json(total);
    } catch (error) {
      res.status(404).json({ error: "User not found" });
    }
  };

  findBalanceByInstitution = async (req, res) => {
    try {
      const balance = await this.accountService.findBalanceByInstitution(
        req.params.userId,
        req.query.institution,
      );
      res.status(200).json(balance);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
}
