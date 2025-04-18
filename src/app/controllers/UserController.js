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
      const status = error.message.includes("CPF") ? 409 : 400;
      res.status(status).json({ error: error.message });
    }
  };

  findById = async (req, res) => {
    try {
      const user = await this.userService.findById(req.params.userId);
      res.status(200).json(user);
    } catch (error) {
      res
        .status(error.message.includes("not found") ? 404 : 500)
        .json({ error: error.message });
    }
  };

  findByCpf = async (req, res) => {
    try {
      const user = await this.userService.findByCpf(req.params.userCpf);
      res.status(200).json(user);
    } catch (error) {
      res
        .status(error.message.includes("not found") ? 404 : 500)
        .json({ error: error.message });
    }
  };

  findAll = async (req, res) => {
    try {
      const users = await this.userService.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  update = async (req, res) => {
    try {
      const updatedUser = await this.userService.update(
        req.params.userId,
        req.body,
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      const status = error.message.includes("CPF")
        ? 409
        : error.message.includes("not found")
          ? 404
          : 400;
      res.status(status).json({ error: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      await this.userService.delete(req.params.userId);
      res.status(204).send();
    } catch (error) {
      const status = error.message.includes("not found") ? 404 : 500;
      res.status(status).json({ error: error.message });
    }
  };
}
