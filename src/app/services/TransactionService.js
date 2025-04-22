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

  async processTransaction(userId, transactionData) {
    const { type } = transactionData;

    switch (type.toLowerCase()) {
      case "debit":
        return this.processDebitTransaction(userId, transactionData);
      case "credit":
        return this.processCreditTransaction(userId, transactionData);
      default:
        throw new Error(`Invalid transaction type: ${type}`);
    }
  }

  async processDebitTransaction(userId, transactionData) {
    let remainingAmount = transactionData.amount;
    const transactions = [];
    const accounts =
      await this.accountRepository.findByUserIdOrderedByBalanceDesc(userId);

    if (!accounts?.length) throw new Error("Account not found");

    const balanceTotal = accounts.reduce(
      (total, account) => total + Number(account.balance),
      0,
    );

    if (balanceTotal < remainingAmount) {
      throw new Error("Insufficient balance");
    }

    for (const account of accounts) {
      if (remainingAmount <= 0) break;

      const accountBalance = Number(account.balance);
      const deduction = Math.min(accountBalance, remainingAmount);

      account.balance = accountBalance - deduction;

      await this.accountRepository.updateBalance(account.id, -deduction);

      const transaction = await this.transactionRepository.create({
        origin_account_id: account.id,
        destination_account_id: transactionData.destination_account_id,
        amount: deduction,
        type: "debit",
      });

      transactions.push(transaction);
      remainingAmount -= deduction;
    }

    await this.accountRepository.updateBalance(
      transactionData.destination_account_id,
      transactionData.amount,
    );

    return {
      balanceTotal,
      accounts,
      transactions,
    };
  }

  async processCreditTransaction(userId, transactionData) {
    let remainingAmount = transactionData.amount;
    const transactions = [];
    const accounts =
      await this.accountRepository.findByUserIdOrderedByCreditAvailableDesc(
        userId,
      );

    if (!accounts?.length) throw new Error("Account not found");

    const creditTotal = accounts.reduce(
      (total, account) => total + Number(account.credit_available),
      0,
    );

    if (creditTotal < remainingAmount) throw new Error("Insufficient credit");

    for (const account of accounts) {
      if (remainingAmount <= 0) break;

      const accountCredit = Number(account.credit_available);
      const deduction = Math.min(accountCredit, remainingAmount);

      account.credit_available = accountCredit - deduction;

      await this.accountRepository.updateCredit(account.id, -deduction);

      const transaction = await this.transactionRepository.create({
        origin_account_id: account.id,
        destination_account_id: transactionData.destination_account_id,
        amount: deduction,
        type: "debit",
      });

      transactions.push(transaction);
      remainingAmount -= deduction;
    }

    await this.accountRepository.updateBalance(
      transactionData.destination_account_id,
      transactionData.amount,
    );

    return {
      creditTotal,
      accounts,
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
      type: "credit",
    });
  }
}
