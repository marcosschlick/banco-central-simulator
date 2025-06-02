import OpenfinanceService from "../services/OpenfinanceService.js";
import AccountService from "../services/AccountService.js";

export default class OpenFinanceController {
  constructor() {
    this.openfinanceService = new OpenfinanceService();
    this.accountService = new AccountService();
  }

  createAuthorization = async (req, res) => {
    try {
      const { cpf, expirationDate, authorization } = req.body;
      const account = await this.accountService.findByCpf(cpf);

      await this.openFinanceService.create({
        account_id: account.id,
        status: authorization,
        expiration_date: expirationDate,
      });

      res.status(201).json({
        success: true,
        message: "Compartilhamento feito com sucesso",
        data: {
          account: {
            institutionName: "Banco do Brasil",
            account: account.account_number,
            agency: account.bank.agency_code,
          },
        },
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  updateAuthorization = async (req, res) => {
    try {
      const { action } = req.params;
      const { cpf, expirationDate, expiration, authorization } = req.body;
      const account = await this.accountService.findByCpf(cpf);

      const updated = await this.openFinanceService.update(account.id, {
        status: authorization,
        expiration_date: expiration ? expirationDate : null,
      });

      const response = {
        success: true,
        message:
          action === "revoke"
            ? "Autorização Revogada com Sucesso"
            : "Autorização Atualizada com Sucesso",
      };

      if (action !== "revoke") {
        response.data = {
          account: {
            institutionName: "Banco do Brasil",
            account: account.account_number,
            agency: account.bank.agency_code,
          },
        };
      }

      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getBalance = async (req, res) => {
    try {
      const { account, agency } = req.query;
      const accountData =
        await this.accountService.findByAccountNumber(account);

      res.status(200).json({
        success: true,
        data: {
          balance: accountData.balance,
        },
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  createTransaction = async (req, res) => {
    try {
      const { account, agency, amount } = req.body;
      const accountData =
        await this.accountService.findByAccountNumber(account);

      const updatedAccount = await this.accountService.update(accountData.id, {
        balance: accountData.balance - amount,
      });

      res.status(201).json({
        success: true,
        message: "Transação feita com sucesso",
        data: {
          balance: updatedAccount.balance,
        },
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
