import UserService from "../services/UserService.js";

export default class UserController {
  constructor() {
    this.userService = new UserService();
  }

  create = async (req, res) => {
    try {
      const user = await this.userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getById = async (req, res) => {
    try {
      const user = await this.userService.findById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: "User not found" });
    }
  };

  getAll = async (req, res) => {
    const users = await this.userService.listAll();
    res.status(200).json(users);
  };

  update = async (req, res) => {
    try {
      const updatedUser = await this.userService.update(
        req.params.id,
        req.body,
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      await this.userService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: "User not found" });
    }
  };
}
