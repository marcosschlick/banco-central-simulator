import UserRepository from "../repositories/UserRepository.js";

export default class AccountService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(userData) {
    return await this.userRepository.create(userData);
  }

  async findById(id) {
    return await this.userRepository.findById(id);
  }

  async listAll() {
    return await this.userRepository.listAll();
  }

  async update(id, updateData) {
    return await this.userRepository.update(id, updateData);
  }

  async delete(id) {
    await this.userRepository.delete(id);
  }
}
