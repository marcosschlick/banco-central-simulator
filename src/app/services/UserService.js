import UserRepository from "../repositories/UserRepository.js";

export default class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(userData) {
    const existingUser = await this.userRepository.findByCpf(userData.cpf);
    if (existingUser) throw new Error("CPF already registered");
    return this.userRepository.create(userData);
  }

  async findById(id) {
    return await this.userRepository.findById(id);
  }

  async findByCpf(cpf) {
    return await this.userRepository.findByCpf(cpf);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async update(id, updateData) {
    if (updateData.cpf) {
      const existingUser = await this.userRepository.findByCpf(updateData.cpf);
      if (existingUser && existingUser.id !== id) {
        throw new Error("CPF already registered");
      }
    }
    const updatedUser = await this.userRepository.update(id, updateData);
    if (!updatedUser) throw new Error("User not found");
    return updatedUser;
  }

  async delete(id) {
    const isDeleted = await this.userRepository.delete(id);
    if (!isDeleted) throw new Error("User not found");
    return true;
  }
}
