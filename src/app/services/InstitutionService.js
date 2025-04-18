import InstitutionRepository from "../repositories/InstitutionRepository.js";

export default class InstitutionService {
  constructor() {
    this.institutionRepository = new InstitutionRepository();
  }

  async create(institutionData) {
    const existingInstitution = await this.institutionRepository.findByCode(
      institutionData.code,
    );
    if (existingInstitution) throw new Error("Code already registered");
    return this.institutionRepository.create(institutionData);
  }

  async findById(id) {
    return await this.institutionRepository.findById(id);
  }

  async findByCode(code) {
    return await this.institutionRepository.findByCode(code);
  }

  async findAll() {
    return await this.institutionRepository.findAll();
  }

  async update(id, updateData) {
    if (updateData.code) {
      const existingInstitution = await this.institutionRepository.findByCode(
        updateData.code,
      );
      if (existingInstitution && existingInstitution.id !== id) {
        throw new Error("Code already registered");
      }
    }
    const updatedInstitution = await this.institutionRepository.update(
      id,
      updateData,
    );
    if (!updatedInstitution) throw new Error("Institution not found");
    return updatedInstitution;
  }

  async delete(id) {
    const isDeleted = await this.institutionRepository.delete(id);
    if (!isDeleted) throw new Error("Institution not found");
    return true;
  }
}
