import OpenFinance from "../models/OpenFinance.js";

export default class OpenFinanceRepository {
  async create(openFinanceData) {
    return await OpenFinance.create(openFinanceData);
  }

  async findById(id) {
    return await OpenFinance.findByPk(id);
  }

  async findAll() {
    return await OpenFinance.findAll();
  }

  async findByAccount(accountId) {
    return await OpenFinance.findOne({
      where: { account_id: accountId },
    });
  }

  async update(id, updateData) {
    const [, [updatedOpenFinance]] = await OpenFinance.update(updateData, {
      where: { id },
      returning: true,
    });
    return updatedOpenFinance;
  }

  async delete(id) {
    const deletedRows = await OpenFinance.destroy({ where: { id } });
    return deletedRows > 0;
  }
}
