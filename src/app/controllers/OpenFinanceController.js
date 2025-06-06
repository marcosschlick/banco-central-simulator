import UserService from "../services/UserService.js";
import AccountService from "../services/AccountService.js";
import OpenFinanceService from "../services/OpenfinanceService.js";
import BankService from "../services/BankService.js";
import TransactionService from "../services/TransactionService.js";

export default class OpenFinanceController {
  constructor() {
    this.userService = new UserService();
    this.accountService = new AccountService();
    this.openFinanceService = new OpenFinanceService();
    this.bankService = new BankService();
    this.transactionService = new TransactionService();
  }

  createAuthorization = async (req, res) => {
    try {
      const { cpf, expirationDate, authorization } = req.body;

      const user = await this.userService.findByCpf(cpf);
      const accounts = await this.accountService.findByUser(user.id);
      if (!accounts.length) throw new Error("User has no accounts");

      const account = accounts[0];
      const bank = await this.bankService.findById(account.bank_id);

      const openFinanceData = {
        status: authorization,
        expiration_date: expirationDate || null,
        account_id: account.id,
      };

      await this.openFinanceService.create(openFinanceData);

      res.status(201).json({
        success: true,
        message: "Compartilhamento feito com sucesso",
        data: {
          account: {
            institutionName: bank.name,
            account: account.account_number,
            agency: bank.agency_code,
          },
        },
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  };

  updateAuthorization = async (req, res) => {
    try {
      const { action } = req.params;
      const { cpf, expirationDate, authorization } = req.body;

      const user = await this.userService.findByCpf(cpf);
      const accounts = await this.accountService.findByUser(user.id);
      if (!accounts.length) throw new Error("User has no accounts");

      const account = accounts[0];
      const bank = await this.bankService.findById(account.bank_id);

      const authRecords = await this.openFinanceService.findAll();
      const authRecord = authRecords.find((a) => a.account_id === account.id);
      if (!authRecord) throw new Error("Authorization not found");

      const updateData = {
        status: action === "revoke" ? false : authorization,
        expiration_date: expirationDate || null,
      };

      await this.openFinanceService.update(authRecord.id, updateData);

      if (action === "revoke") {
        return res.json({
          success: true,
          message: "Autorização Revogada com Sucesso",
        });
      }

      res.json({
        success: true,
        message: "Autorização Atualizada com Sucesso",
        data: {
          account: {
            institutionName: bank.name,
            account: account.account_number,
            agency: bank.agency_code,
          },
        },
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  };

  getBalance = async (req, res) => {
    try {
      const { account, agency } = req.query;
      if (!account || !agency) {
        throw new Error("Account and agency parameters are required");
      }

      const acc = await this.accountService.findByAccountNumber(account);
      const bank = await this.bankService.findById(acc.bank_id);
      if (bank.agency_code !== agency) {
        throw new Error("Agency does not match bank records");
      }

      res.json({
        success: true,
        data: {
          balance: acc.balance,
        },
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  };

  createTransaction = async (req, res) => {
    try {
      const { account, agency, amount } = req.body;
      const acc = await this.accountService.findByAccountNumber(account);
      const bank = await this.bankService.findById(acc.bank_id);
      if (bank.agency_code !== agency) {
        throw new Error("Agency does not match bank records");
      }

      const authRecords = await this.openFinanceService.findAll();
      const authRecord = authRecords.find((a) => a.account_id === acc.id);

      if (!authRecord || !authRecord.status) {
        throw new Error(
          "Open Finance authorization not active for this account",
        );
      }

      const newBalance = parseFloat(acc.balance) - parseFloat(amount);
      if (newBalance < 0) throw new Error("Insufficient funds");

      await this.accountService.update(acc.id, { balance: newBalance });
      await this.transactionService.create({ amount, account_id: acc.id });

      res.json({
        success: true,
        message: "Transação feita com sucesso",
        data: {
          balance: newBalance,
        },
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  };
}
