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
      res.status(400).json({ error: error.message });
    }
  };

  getById = async (req, res) => {
    try {
      const institution = await this.institutionService.findById(
        req.params.institutionId,
      );
      res.status(200).json(institution);
    } catch (error) {
      res.status(404).json({ error: "Institution not found" });
    }
  };

  getAll = async (req, res) => {
    const institutions = await this.institutionService.listAll();
    res.status(200).json(institutions);
  };

  update = async (req, res) => {
    try {
      const updatedInstitution = await this.institutionService.update(
        req.params.institutionId,
        req.body,
      );
      res.status(200).json(updatedInstitution);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      await this.institutionService.delete(req.params.institutionId);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: "Institution not found" });
    }
  };
}
