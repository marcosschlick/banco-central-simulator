import Transaction from "../models/Transaction.js";
import { Op } from "sequelize";

export default class TransactionRepository {
  async create(transactionData) {
    return await Transaction.create(transactionData);
  }

  async findByUser(accountIds) {
    return await Transaction.findAll({
      where: { origin_account_id: { [Op.in]: accountIds } },
    });
  }

  async findById(id) {
    return await Transaction.findByPk(id);
  }

  async listAll() {
    return await Transaction.findAll();
  }

  async update(id, updateData) {
    await Transaction.update(updateData, { where: { id } });
    return await Transaction.findByPk(id);
  }

  async delete(id) {
    await Transaction.destroy({ where: { id } });
  }
}
