import Transaction from "../models/Transaction.js";
import { Op } from "sequelize";

export default class TransactionRepository {
  async create(transactionData) {
    return await Transaction.create(transactionData);
  }

  async findById(id) {
    return await Transaction.findByPk(id);
  }

  async findByOriginAccountIds(accountIds) {
    return await Transaction.findAll({
      where: { origin_account_id: { [Op.in]: accountIds } },
    });
  }

  async findAll() {
    return await Transaction.findAll();
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
