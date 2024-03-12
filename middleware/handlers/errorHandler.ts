import { NextFunction, Request, Response } from "express";

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.log(err.stack);
  res.status(500).send("Something broke!");
}

export { errorHandler };
