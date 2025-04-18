import AccountRepository from "../repositories/AccountRepository.js";
import UserRepository from "../repositories/UserRepository.js";
import InstitutionRepository from "../repositories/InstitutionRepository.js";

export default class AccountService {
  constructor() {
    this.accountRepository = new AccountRepository();
    this.userRepository = new UserRepository();
    this.institutionRepository = new InstitutionRepository();
  }

  async create(accountData) {
    return await this.accountRepository.create(accountData);
  }

  async findById(id) {
    const account = await this.accountRepository.findById(id);
    if (!account) throw new Error("Account not found");
    return account;
  }

  async findByUserId(userId) {
    return await this.accountRepository.findByUserId(userId);
  }

  async findAll() {
    return await this.accountRepository.findAll();
  }

  async update(id, updateData) {
    const updatedAccount = await this.accountRepository.update(id, updateData);
    if (!updatedAccount) throw new Error("Account not found");
    return updatedAccount;
  }

  async delete(id) {
    const isDeleted = await this.accountRepository.delete(id);
    if (!isDeleted) throw new Error("Account not found");
    return true;
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

  async getBalances(userId) {
    const user = await this.userRepository.findById(userId);
    const balances = await this.accountRepository.getBalance(userId);

    return Promise.all(
      balances.map(async (item) => {
        const institution = await this.institutionRepository.findById(
          item.institution_id,
        );
        return {
          user: user.name,
          institution: institution.name,
          balance: item.balance,
          creditLimit: item.credit_limit,
          creditAvailable: item.credit_available,
        };
      }),
    );
  }

  async getTotalBalance(userId) {
    const user = await this.userRepository.findById(userId);
    const accounts = await this.accountRepository.getBalance(userId);

    const totals = accounts.reduce(
      (acc, account) => ({
        balance: acc.balance + Number(account.balance),
        creditLimit: acc.creditLimit + Number(account.credit_limit),
        creditAvailable: acc.creditAvailable + Number(account.credit_available),
      }),
      { balance: 0, creditLimit: 0, creditAvailable: 0 },
    );

    return {
      user: user.name,
      totalBalance: totals.balance,
      totalCreditLimit: totals.creditLimit,
      totalCreditAvailable: totals.creditAvailable,
    };
  }

  async getBalanceByInstitution(userId, institutionName) {
    const user = await this.userRepository.findById(userId);
    const { id: institutionId, name } =
      await this.institutionRepository.findByName(institutionName);

    const balance = await this.accountRepository.getBalanceByInstitution(
      userId,
      institutionId,
    );

    return {
      user: user.name,
      institution: name,
      balance: balance.balance,
      creditLimit: balance.credit_limit,
      creditAvailable: balance.credit_available,
    };
  }
}
