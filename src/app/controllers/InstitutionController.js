import InstitutionService from "../services/InstitutionService.js";

export default class InstitutionController {
  constructor() {
    this.institutionService = new InstitutionService();
  }

  create = async (req, res) => {
    try {
      const institution = await this.institutionService.create(req.body);
      res.status(201).json(institution);
    } catch (error) {
      const status = error.message.includes("Code") ? 409 : 400;
      res.status(status).json({ error: error.message });
    }
  };

  findById = async (req, res) => {
    try {
      const institution = await this.institutionService.findById(
        req.params.institutionId,
      );
      res.status(200).json(institution);
    } catch (error) {
      res
        .status(error.message.includes("not found") ? 404 : 500)
        .json({ error: error.message });
    }
  };

  findByCode = async (req, res) => {
    try {
      const institution = await this.institutionService.findByCode(
        req.params.institutionCode,
      );
      res.status(200).json(institution);
    } catch (error) {
      res
        .status(error.message.includes("not found") ? 404 : 500)
        .json({ error: error.message });
    }
  };

  findAll = async (req, res) => {
    try {
      const institutions = await this.institutionService.findAll();
      res.status(200).json(institutions);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  update = async (req, res) => {
    try {
      const updatedInstitution = await this.institutionService.update(
        req.params.institutionId,
        req.body,
      );
      res.status(200).json(updatedInstitution);
    } catch (error) {
      const status = error.message.includes("Code")
        ? 409
        : error.message.includes("not found")
          ? 404
          : 400;
      res.status(status).json({ error: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      await this.institutionService.delete(req.params.institutionId);
      res.status(204).send();
    } catch (error) {
      const status = error.message.includes("not found") ? 404 : 500;
      res.status(status).json({ error: error.message });
    }
  };
}
