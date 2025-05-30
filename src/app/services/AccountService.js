import AccountRepository from "../repositories/AccountRepository.js";

export default class AccountService {
  constructor() {
    this.accountRepository = new AccountRepository();
  }

  async create(accountData) {
    const existingAccount = await this.accountRepository.findByUserAndBank(
      accountData.userId,
      accountData.bankId,
    );
    if (existingAccount)
      throw new Error("User already registered with this bank");
    const existingNumberAccount =
      await this.accountRepository.findByAccountNumber(
        accountData.accountNumber,
      );
    if (existingNumberAccount)
      throw new Error("Number account already registered");
    return this.accountRepository.create(accountData);
  }

  async findById(id) {
    const account = await this.accountRepository.findById(id);
    if (!account) throw new Error("Account not found");
    return account;
  }

  async findAll() {
    return await this.accountRepository.findAll();
  }

  async findByUser(userId) {
    return await this.accountRepository.findByUser(userId);
  }

  async update(id, updateData) {
    if (updateData.userId || updateData.bankId) {
      const account = await this.accountRepository.findById(id);
      if (!account) throw new Error("Account not found");
      const userId = updateData.userId || account.userId;
      const bankId = updateData.bankId || account.bankId;
      const existingAccount = await this.accountRepository.findByUserAndBank(
        userId,
        bankId,
      );
      if (existingAccount && existingAccount.id !== id) {
        throw new Error("User already registered with this bank");
      }
    }
    if (updateData.accountNumber) {
      const existingNumberAccount =
        await this.accountRepository.findByAccountNumber(
          updateData.accountNumber,
        );
      if (existingNumberAccount && existingNumberAccount.id !== id) {
        throw new Error("Number account already registered");
      }
    }
    const updatedAccount = await this.accountRepository.update(id, updateData);
    if (!updatedAccount) throw new Error("Account not found");
    return updatedAccount;
  }

  async delete(id) {
    const isDeleted = await this.accountRepository.delete(id);
    if (!isDeleted) throw new Error("Account not found");
    return true;
  }
}
