const dotenv = require("dotenv");
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
export interface IGetUserAuthInfoRequest extends Request {
  user_id?: any; // or any other type
}
dotenv.config();

function authenticate(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
  // What you sent in frontend header must be the same as what you are getting here. In this case token
  // token is the name passed in frontend.
  // const token = req.headers.Authorization;. Play around with this next weekend.
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];
  console.log(token, "this is the token");
  // Check if token is undefined
  if (!authHeader) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (!process.env.SKEY) {
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }

  jwt.verify(token as string, process.env.SKEY, (err: any, user: any) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      req.user_id = user.id as any; // extracts the user id from the payload and assigns it to the request object

      console.log(user, "this is the user");

      next();
    }
  });
}

export { authenticate };
