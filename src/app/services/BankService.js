import BankRepository from "../repositories/BankRepository.js";

export default class BankService {
  constructor() {
    this.bankRepository = new BankRepository();
  }

  async create(bankData) {
    const existingBank = await this.bankRepository.findByAgencyCode(
      bankData.agencyCode,
    );
    if (existingBank) throw new Error("Agency code already registered");
    return this.bankRepository.create(bankData);
  }

  async findById(id) {
    const bank = await this.bankRepository.findById(id);
    if (!bank) throw new Error("Bank not found");
    return bank;
  }

  async findAll() {
    return await this.bankRepository.findAll();
  }

  async findByAgencyCode(agencyCode) {
    const bank = await this.bankRepository.findByAgencyCode(agencyCode);
    if (!bank) throw new Error("Bank not found");
    return bank;
  }

  async findByName(name) {
    return await this.bankRepository.findByName(name);
  }

  async update(id, updateData) {
    if (updateData.code) {
      const existingBank = await this.bankRepository.findByAgencyCode(
        updateData.agencyCode,
      );
      if (existingBank && existingBank.id !== id) {
        throw new Error("Agency code already registered");
      }
    }
    const updatedBank = await this.bankRepository.update(id, updateData);
    if (!updatedBank) throw new Error("Bank not found");
    return updatedBank;
  }

  async delete(id) {
    const isDeleted = await this.bankRepository.delete(id);
    if (!isDeleted) throw new Error("Bank not found");
    return true;
  }
}
