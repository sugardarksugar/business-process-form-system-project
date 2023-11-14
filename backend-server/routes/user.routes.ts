import express from "express";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { knex } from "../client";
import { wrapController } from "../express";

export let userRoutes = express.Router();

let userService = new UserService(knex);
let userController = new UserController(userService);

userRoutes.post("/login", wrapController(userController.login));
userRoutes.post("/create-user", userController.createUser);
