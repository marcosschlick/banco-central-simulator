import express from "express";
import InstitutionController from "../app/controllers/InstitutionController.js";

const router = express.Router();

const institutionController = new InstitutionController();

// institution routes
router.post("", institutionController.create);
router.get("/id/:institutionId", institutionController.findById);
router.get("/code/:institutionCode", institutionController.findByCode);
router.get("", institutionController.findAll);
router.put("/:institutionId", institutionController.update);
router.delete("/:institutionId", institutionController.delete);

export { router as institutionRoutes };
