import { NextFunction, Request, Response } from "express";

export function wrapController(fn: (req: Request) => any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let json = await fn(req);
      res.json(json);
    } catch (error) {
      next(error);
    }
  };
}
