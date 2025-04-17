import express from "express";
import InstitutionController from "../app/controllers/InstitutionController.js";

const router = express.Router();

const institutionController = new InstitutionController();

// Base Institution routes
router.post("", institutionController.create);
router.get("/:institutionId", institutionController.getById);
router.get("", institutionController.getAll);
router.put("/:institutionId", institutionController.update);
router.delete("/:institutionId", institutionController.delete);

export { router as institutionRoutes };
