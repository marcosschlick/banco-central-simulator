import InstitutionRepository from "../repositories/InstitutionRepository.js";

export default class InstitutionService {
  constructor() {
    this.institutionRepository = new InstitutionRepository();
  }

  async create(institutionData) {
    return await this.institutionRepository.create(institutionData);
  }

  async findById(id) {
    return await this.institutionRepository.findById(id);
  }

  async listAll() {
    return await this.institutionRepository.listAll();
  }

  async update(id, updateData) {
    return await this.institutionRepository.update(id, updateData);
  }

  async delete(id) {
    await this.institutionRepository.delete(id);
  }
}
