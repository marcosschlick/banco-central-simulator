import User from "../models/User.js";

export default class UserRepository {
  async create(userData) {
    return await User.create(userData);
  }

  async findById(id) {
    return await User.findByPk(id);
  }

  async findByCpf(cpf) {
    return await User.findOne({ where: { cpf } });
  }

  async findAll() {
    return await User.findAll();
  }

  async update(id, updateData) {
    const [, [updatedUser]] = await User.update(updateData, {
      where: { id },
      returning: true,
    });
    return updatedUser;
  }

  async delete(id) {
    const deletedRows = await User.destroy({ where: { id } });
    return deletedRows > 0;
  }
}
