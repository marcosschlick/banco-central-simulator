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
    return this.transactionRepository.create(transactionData);
  }

  async findById(id) {
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) throw new Error("Transaction not found");
    return transaction;
  }

  async findAll() {
    return await this.transactionRepository.findAll();
  }

  async update(id, updateData) {
    const updatedTransaction = await this.transactionRepository.update(
      id,
      updateData,
    );
    if (!updatedTransaction) throw new Error("Transaction not found");
    return updatedTransaction;
  }

  async delete(id) {
    const isDeleted = await this.transactionRepository.delete(id);
    if (!isDeleted) throw new Error("Transaction not found");
    return true;
  }

  async findByUserId(userId) {
    const user = await this.userRepository.findById(userId);
    const accounts = await this.accountRepository.findByUserId(userId);

    return {
      user: user.name,
      transactions: await this.transactionRepository.findByOriginAccountIds(
        accounts.map((a) => a.id),
      ),
    };
  }

  async findByInstitution(userId, institution) {
    const { name: userName } = await this.userRepository.findById(userId);
    const { id: institutionId, name: institutionName } =
      await this.institutionRepository.findByName(institution);
    const accounts = await this.accountRepository.findByUserId(userId);

    const transactions =
      await this.transactionRepository.findByOriginAccountIds(
        accounts
          .filter((a) => a.institution_id === institutionId)
          .map((c) => c.id),
      );

    return {
      user: userName,
      institution: institutionName,
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

    const accounts = await this.accountRepository.findByUserId(userId);
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

    const accounts = await this.accountRepository.findByUserId(userId);
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
}
