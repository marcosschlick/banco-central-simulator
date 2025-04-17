import Account from "../models/Account.js";

export default class AccountRepository {
  async create(accountData) {
    return await Account.create(accountData);
  }

  async findById(id) {
    return await Account.findByPk(id);
  }

  async findByUser(userId) {
    return await Account.findAll({
      where: { user_id: userId },
      attributes: ["id", "institution_id"],
    });
  }

  async listAll() {
    return await Account.findAll();
  }

  async getBalance(userId) {
    return await Account.findAll({
      where: { user_id: userId },
      attributes: [
        "balance",
        "institution_id",
        "credit_limit",
        "credit_available",
      ],
    });
  }

  async getBalanceByInstitution(userId, institutionId) {
    return await Account.findOne({
      where: { user_id: userId, institution_id: institutionId },
      attributes: [
        "balance",
        "institution_id",
        "credit_limit",
        "credit_available",
      ],
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

  async delete(id) {
    await Account.destroy({ where: { id } });
  }
}
