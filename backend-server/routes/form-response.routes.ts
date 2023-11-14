import express from "express";
import { knex } from "../client";
import { FormResponseService } from "../services/form-response.service";
import { FormResponseController } from "../controllers/form-response.controller";

export let formResponseRoutes = express.Router();

let formResponseService = new FormResponseService(knex);
let formResponseController = new FormResponseController(formResponseService);

formResponseRoutes.get("/forms/:id", formResponseController.getFormDetails);
formResponseRoutes.patch("/forms/:id/fields", formResponseController.saveDraft);
// formResponseRoutes.post("/form/fields/contents", formResponseController.)
