import Transaction from "../models/Transaction.js";
import { Op } from "sequelize";

export default class TransactionRepository {
  async create(transactionData) {
    return await Transaction.create(transactionData);
  }

  async findById(id) {
    return await Transaction.findByPk(id);
  }

  async findAll() {
    return await Transaction.findAll();
  }

  async findByAccount(accountId) {
    return await Transaction.findAll({
      where: { account_id: { [Op.in]: accountId } },
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
