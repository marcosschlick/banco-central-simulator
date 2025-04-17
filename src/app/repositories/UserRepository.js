import User from "../models/User.js";

export default class UserRepository {
  async create(userData) {
    return await User.create(userData);
  }

  async findById(id) {
    return await User.findByPk(id);
  }

  async getUserName(id) {
    return await User.findOne({
      where: { id },
      attributes: ["name"],
    });
  }

  async listAll() {
    return await User.findAll();
  }

  async update(id, updateData) {
    await User.update(updateData, { where: { id } });
    return await User.findByPk(id);
  }

  async delete(id) {
    await User.destroy({ where: { id } });
  }
}
