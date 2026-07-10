import UserRepository from "../repositories/UserRepository.js";

export default class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(userData) {
    const existingUserCpf = await this.userRepository.findByCpf(userData.cpf);
    if (existingUserCpf) throw new Error("CPF already registered");
    const existingUserEmail = await this.userRepository.findByEmail(
      userData.email,
    );
    if (existingUserEmail) throw new Error("Email already registered");
    return this.userRepository.create(userData);
  }

  async findById(id) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findByCpf(cpf) {
    const user = await this.userRepository.findByCpf(cpf);
    if (!user) throw new Error("User not found");
    return user;
  }

  async findByEmail(email) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("User not found");
    return user;
  }

  async findByName(name) {
    return await this.userRepository.findByName(name);
  }

  async update(id, updateData) {
    if (updateData.cpf) {
      const existingUserCpf = await this.userRepository.findByCpf(
        updateData.cpf,
      );
      if (existingUserCpf && existingUserCpf.id !== id) {
        throw new Error("CPF already registered");
      }
    }
    if (updateData.email) {
      const existingUserEmail = await this.userRepository.findByEmail(
        updateData.email,
      );
      if (existingUserEmail && existingUserEmail.id !== id) {
        throw new Error("Email already registered");
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
