import { NextFunction, Request, Response } from "express";

function notFoundError(req: Request, res: Response, next: NextFunction) {
  const error = new Error("Page was Not found");
  res.status(404);
  next(error);
}

module.exports = notFoundError;
