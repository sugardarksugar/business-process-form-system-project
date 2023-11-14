import { config } from "dotenv";
import populateEnv from "populate-env";

config();

export let env = {
  NODE_ENV: "development",
  JWT_SECRET: "",
  POSTGRES_HOST: "",
  POSTGRES_DB: "",
  POSTGRES_USER: "",
  POSTGRES_PASSWORD: "",
};

populateEnv(env, { mode: "halt" });
