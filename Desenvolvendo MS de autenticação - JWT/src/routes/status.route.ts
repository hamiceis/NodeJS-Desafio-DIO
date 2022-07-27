import { NextFunction, Request, Response, Router } from "express";
import { OK } from "http-status-codes";

const statusRoute = Router();

statusRoute.get(
  "/status",
  (req: Request, res: Response, next: NextFunction) => {
    res.status(OK).send({ foo: "Sucesso!" });
  }
);

export { statusRoute };
