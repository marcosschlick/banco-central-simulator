import Institution from "../models/Institution.js";
import { Op } from "sequelize";

export default class InstitutionRepository {
  async create(institutionData) {
    return await Institution.create(institutionData);
  }

  async findById(id) {
    return await Institution.findByPk(id);
  }

  async findByCode(code) {
    return await Institution.findOne({ where: { code } });
  }

  async findByName(searchName) {
    const normalizedName = searchName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    return await Institution.findOne({
      where: {
        name: {
          [Op.iLike]: `%${normalizedName}%`,
        },
      },
    });
  }

  async findAll() {
    return await Institution.findAll();
  }

  async update(id, updateData) {
    const [, [updatedInstitution]] = await Institution.update(updateData, {
      where: { id },
      returning: true,
    });
    return updatedInstitution;
  }

  async delete(id) {
    const deletedRows = await Institution.destroy({ where: { id } });
    return deletedRows > 0;
  }
}
