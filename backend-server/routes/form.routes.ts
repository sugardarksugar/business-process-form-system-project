import express from "express";
import { FormController } from "../controllers/form.controller";
import { FormService } from "../services/form.services";
import { knex } from "../client";

export let formRoutes = express.Router();

let formService = new FormService(knex);
let formController = new FormController(formService);

formRoutes.post("/template", formController.createTemplate);
formRoutes.get("/form/search", formController.searchForm);
formRoutes.get("/reference-form/search", formController.searchReferenceForm);
formRoutes.post("/form/submit", formController.submitForm);
formRoutes.get("/form/as/viewer", formController.getViewerForm);
formRoutes.get("/form/as/filler", formController.getFillerForm);
formRoutes.delete("/delete", formController.deleteReceivedForm);
