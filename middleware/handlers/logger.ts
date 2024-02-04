import { Request, Response, NextFunction } from "express";

function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`${req} request sent at ${Date.now()} ${res}`, "request sent", "logger");
  next();
}

module.exports = logger;
