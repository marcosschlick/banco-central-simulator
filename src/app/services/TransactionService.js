import TransactionRepository from "../repositories/TransactionRepository.js";
import InstitutionRepository from "../repositories/InstitutionRepository.js";
import UserRepository from "../repositories/UserRepository.js";
import AccountRepository from "../repositories/AccountRepository.js";

export default class TransactionService {
  constructor() {
    this.institutionRepository = new InstitutionRepository();
    this.accountRepository = new AccountRepository();
    this.userRepository = new UserRepository();
    this.transactionRepository = new TransactionRepository();
  }

  async create(transactionData) {
    return await this.transactionRepository.create(transactionData);
  }

  async findById(id) {
    return await this.transactionRepository.findById(id);
  }

  async listAll() {
    return await this.transactionRepository.listAll();
  }

  async getUserTransactions(userId) {
    const user = await this.userRepository.findById(userId);
    const accounts = await this.accountRepository.findByUser(userId);

    return {
      user: user.name,
      transactions: await this.transactionRepository.findByUser(
        accounts.map((a) => a.id),
      ),
    };
  }

  async getUserTransactionsByInstitution(userId, institutionName) {
    const { name } = await this.userRepository.getUserName(userId);
    const { id: institutionId } =
      await this.institutionRepository.findByName(institutionName);
    const accounts = await this.accountRepository.findByUser(userId);

    const transactions = await this.transactionRepository.findByUser(
      accounts
        .filter((a) => a.institutionId === institutionId)
        .map((c) => c.id),
    );

    return {
      name: name,
      transactions,
    };
  }

  async processTransactionByInstitution(
    userId,
    transactionData,
    institutionName,
  ) {
    const { type } = transactionData;

    switch (type.toLowerCase()) {
      case "debit":
        return this.processDebitTransactionByInstitution(
          userId,
          transactionData,
          institutionName,
        );
      case "credit":
        return this.processCreditTransactionByInstitution(
          userId,
          transactionData,
          institutionName,
        );
      default:
        throw new Error(`Invalid transaction type: ${type}`);
    }
  }

  async processDebitTransactionByInstitution(
    userId,
    transactionData,
    institutionName,
  ) {
    const institution =
      await this.institutionRepository.findByName(institutionName);
    if (!institution) throw new Error("Institution not found");

    const accounts = await this.accountRepository.findByUser(userId);
    const account = accounts.find((a) => a.institution_id === institution.id);
    if (!account) throw new Error("Account not found in specified institution");

    if (account.balance < transactionData.amount) {
      throw new Error("Insufficient balance");
    }

    await this.accountRepository.updateBalance(
      account.id,
      -transactionData.amount,
    );
    await this.accountRepository.updateBalance(
      transactionData.destination_account_id,
      transactionData.amount,
    );

    return this.transactionRepository.create({
      origin_account_id: account.id,
      destination_account_id: transactionData.destination_account_id,
      amount: transactionData.amount,
      type: "debit",
    });
  }

  async processCreditTransactionByInstitution(
    userId,
    transactionData,
    institutionName,
  ) {
    const institution =
      await this.institutionRepository.findByName(institutionName);
    if (!institution) throw new Error("Institution not found");

    const accounts = await this.accountRepository.findByUser(userId);
    const account = accounts.find((a) => a.institution_id === institution.id);
    if (!account) throw new Error("Account not found in specified institution");

    if (account.credit_available < transactionData.amount) {
      throw new Error("Insufficient credit");
    }

    await this.accountRepository.updateCredit(
      account.id,
      transactionData.amount,
    );
    await this.accountRepository.updateBalance(
      transactionData.destination_account_id,
      transactionData.amount,
    );

    return this.transactionRepository.create({
      origin_account_id: account.id,
      destination_account_id: transactionData.destination_account_id,
      amount: transactionData.amount,
      type: "credit",
    });
  }

  async update(id, updateData) {
    return await this.transactionRepository.update(id, updateData);
  }

  async delete(id) {
    await this.transactionRepository.delete(id);
  }
}
