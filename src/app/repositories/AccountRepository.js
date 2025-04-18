import Account from "../models/Account.js";

export default class AccountRepository {
  async create(accountData) {
    return await Account.create(accountData);
  }

  async findById(id) {
    return await Account.findByPk(id);
  }

  async findByUserId(userId) {
    return await Account.findAll({
      where: { user_id: userId },
    });
  }

  async findAll() {
    return await Account.findAll();
  }

  async update(id, updateData) {
    const [, [updatedAccount]] = await Account.update(updateData, {
      where: { id },
      returning: true,
    });
    return updatedAccount;
  }

  async delete(id) {
    const deletedRows = await Account.destroy({ where: { id } });
    return deletedRows > 0;
  }

  async getBalance(userId) {
    return await Account.findAll({
      where: { user_id: userId },
    });
  }

  async getBalanceByInstitution(userId, institutionId) {
    return await Account.findOne({
      where: { user_id: userId, institution_id: institutionId },
    });
  }

  async updateBalance(accountId, amount) {
    const account = await this.findById(accountId);
    if (!account) throw new Error("Account not found");

    const newBalance = Number(account.balance) + Number(amount);
    await Account.update({ balance: newBalance }, { where: { id: accountId } });
    return this.findById(accountId);
  }

  async updateCredit(accountId, amount) {
    const account = await this.findById(accountId);
    if (!account) throw new Error("Account not found");

    const newCredit = Number(account.credit_available) - Number(amount);
    await Account.update(
      { credit_available: newCredit },
      { where: { id: accountId } },
    );
    return this.findById(accountId);
  }
}
