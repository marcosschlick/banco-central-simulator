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
    return await this.accountRepository.findById(id);
  }

  async findByUser(userId) {
    return await this.accountRepository.findByUser(userId);
  }

  async listAll() {
    return await this.accountRepository.listAll();
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
    const institution =
      await this.institutionRepository.findByName(institutionName);
    if (!institution) throw new Error("Institution not found");

    const balance = await this.accountRepository.getBalanceByInstitution(
      userId,
      institution.id,
    );

    return {
      user: user.name,
      institution: institution.name,
      balance: balance.balance,
      creditLimit: balance.credit_limit,
      creditAvailable: balance.credit_available,
    };
  }

  async update(id, updateData) {
    return await this.accountRepository.update(id, updateData);
  }

  async delete(id) {
    await this.accountRepository.delete(id);
  }
}
