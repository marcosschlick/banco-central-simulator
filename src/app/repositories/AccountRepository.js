import Account from "../models/Account.js";

export default class AccountRepository {
  async create(accountData) {
    return await Account.create(accountData);
  }

  async findById(id) {
    return await Account.findByPk(id);
  }

  async findAll() {
    return await Account.findAll();
  }

  async findByUser(userId) {
    return await Account.findAll({
      where: { user_id: userId },
    });
  }

  async findByAccountNumber(accountNumber) {
    return await Account.findOne({
      where: { account_number: accountNumber },
    });
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
}
