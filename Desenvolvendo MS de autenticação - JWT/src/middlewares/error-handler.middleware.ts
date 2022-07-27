import { Request, Response, NextFunction } from "express";
import { BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER_ERROR } from "http-status-codes";
import databaseError from "../models/errors/database.error.model";
import ForbiddenError from "../models/errors/forbidden.error.model";


function errorHandler (error: any, req: Request, res: Response, next: NextFunction) {
  if(error instanceof databaseError){
    res.sendStatus(BAD_REQUEST)
  } else if (error instanceof ForbiddenError) {
    res.sendStatus(FORBIDDEN)
  } else {
    res.sendStatus(INTERNAL_SERVER_ERROR)
  }
}

export default errorHandler;