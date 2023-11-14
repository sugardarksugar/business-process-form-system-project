import Knex from "knex";
import { env } from "./env";

let configs = require("./knexfile");
let config = configs[env.NODE_ENV];
export let knex = Knex(config);