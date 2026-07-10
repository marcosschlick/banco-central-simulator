import Transaction from "../models/Transaction.js";

export default class TransactionRepository {
  async create(transactionData) {
    try {
      return await Transaction.create(transactionData);
    } catch (error) {
      throw new Error(`Failed to create transaction: ${error.message}`);
    }
  }

  async findById(id) {
    return await Transaction.findByPk(id);
  }

  async findAll() {
    return await Transaction.findAll();
  }

  async findByAccount(accountId) {
    return await Transaction.findAll({
      where: { account_id: accountId },
    });
  }

  async update(id, updateData) {
    const [, [updatedTransaction]] = await Transaction.update(updateData, {
      where: { id },
      returning: true,
    });
    return updatedTransaction;
  }

  async delete(id) {
    const deletedRows = await Transaction.destroy({ where: { id } });
    return deletedRows > 0;
  }
}
