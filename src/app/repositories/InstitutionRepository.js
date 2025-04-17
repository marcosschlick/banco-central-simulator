import Institution from "../models/Institution.js";
import { Op } from "sequelize";

export default class InstitutionRepository {
  async create(institutionData) {
    return await Institution.create(institutionData);
  }

  async findById(id) {
    return await Institution.findByPk(id);
  }

  async findByName(searchName) {
    const normalizedName = searchName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    return await Institution.findOne({
      where: {
        name: { [Op.iLike]: `%${normalizedName}%` },
      },
      attributes: ["id", "name"],
    });
  }

  async listAll() {
    return await Institution.findAll();
  }

  async update(id, updateData) {
    await Institution.update(updateData, { where: { id } });
    return await Institution.findByPk(id);
  }

  async delete(id) {
    await Institution.destroy({ where: { id } });
  }
}
