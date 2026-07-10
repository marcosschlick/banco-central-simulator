import Bank from "../models/Bank.js";
import { Op } from "sequelize";

export default class BankRepository {
  async create(bankData) {
    try {
      return await Bank.create(bankData);
    } catch (error) {
      throw new Error(`Failed to create bank: ${error.message}`);
    }
  }

  async findById(id) {
    return await Bank.findByPk(id);
  }

  async findAll() {
    return await Bank.findAll();
  }

  async findByAgencyCode(agencyCode) {
    return await Bank.findOne({ where: { agency_code: agencyCode } });
  }

  async findByName(searchName) {
    const normalizedName = searchName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    return await Bank.findAll({
      where: { name: { [Op.iLike]: `%${normalizedName}%` } },
    });
  }

  async update(id, updateData) {
    const [, [updatedBank]] = await Bank.update(updateData, {
      where: { id },
      returning: true,
    });
    return updatedBank;
  }

  async delete(id) {
    const deletedRows = await Bank.destroy({ where: { id } });
    return deletedRows > 0;
  }
}
