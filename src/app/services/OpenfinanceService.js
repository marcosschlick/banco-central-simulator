import OpenFinanceRepository from "../repositories/OpenFinanceRepository.js";

export default class OpenFinanceService {
  constructor() {
    this.openFinanceRepository = new OpenFinanceRepository();
  }

  async create(openFinanceData) {
    return this.openFinanceRepository.create(openFinanceData);
  }

  async findById(id) {
    const authorization = await this.openFinanceRepository.findById(id);
    if (!authorization) throw new Error("Open finance not found");
    return authorization;
  }

  async findAll() {
    return await this.openFinanceRepository.findAll();
  }

  async update(id, updateData) {
    const updatedOpenFinance = await this.openFinanceRepository.update(
      id,
      updateData,
    );
    if (!updatedOpenFinance) throw new Error("Open finance not found");
    return updatedOpenFinance;
  }

  async delete(id) {
    const isDeleted = await this.openFinanceRepository.delete(id);
    if (!isDeleted) throw new Error("Open finance not found");
    return true;
  }
}
