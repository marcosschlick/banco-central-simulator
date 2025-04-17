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

  createById = async (req, res) => {
    try {
      const user_id = req.params.id;
      const { institution_id, balance, credit_limit, credit_available } =
        req.body;
      const newAccount = {
        user_id,
        institution_id,
        balance,
        credit_limit,
        credit_available,
      };
      const account = await this.accountService.create(newAccount);
      res.status(201).json(account);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getById = async (req, res) => {
    try {
      const account = await this.accountService.findById(req.params.id);
      res.status(200).json(account);
    } catch (error) {
      res.status(404).json({ error: "Account not found" });
    }
  };

  getAll = async (req, res) => {
    const accounts = await this.accountService.listAll();
    res.status(200).json(accounts);
  };

  getByUser = async (req, res) => {
    try {
      const accounts = await this.accountService.findByUser(req.params.userId);
      res.status(200).json(accounts);
    } catch (error) {
      res.status(404).json({ error: "No accounts found" });
    }
  };

  getBalances = async (req, res) => {
    try {
      const balances = await this.accountService.getBalances(req.params.userId);
      res.status(200).json(balances);
    } catch (error) {
      res.status(404).json({ error: "User not found" });
    }
  };

  getTotalBalance = async (req, res) => {
    try {
      const total = await this.accountService.getTotalBalance(
        req.params.userId,
      );
      res.status(200).json(total);
    } catch (error) {
      res.status(404).json({ error: "User not found" });
    }
  };

  getBalanceByInstitution = async (req, res) => {
    try {
      const balance = await this.accountService.getBalanceByInstitution(
        req.params.userId,
        req.query.institution,
      );
      res.status(200).json(balance);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  update = async (req, res) => {
    try {
      const updatedAccount = await this.accountService.update(
        req.params.id,
        req.body,
      );
      res.status(200).json(updatedAccount);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      await this.accountService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: "Account not found" });
    }
  };
}
