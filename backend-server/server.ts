import express, { NextFunction, Request, Response } from "express";
import { print } from "listening-on";
import cors from "cors";

let app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import { userRoutes } from "./routes/user.routes";
app.use(userRoutes);

import { formRoutes } from "./routes/form.routes";
import { HttpError } from "./error";
app.use(formRoutes);

import { formResponseRoutes } from "./routes/form-response.routes";
app.use(formResponseRoutes);

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.statusCode || 500);
  res.json({
    error: String(error).replace("TypeError: ", "").replace("Error: ", ""),
  });
});

let port = 8100;
app.listen(port, () => {
  print(port);
});
