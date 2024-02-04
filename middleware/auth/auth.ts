const dotenv = require("dotenv");
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
export interface IGetUserAuthInfoRequest extends Request {
  user?: string; // or any other type
}
dotenv.config();

export function authenticate(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
  // What you sent in frontend header must be the same as what you are getting here. In this case token
  // token is the name passed in frontend.
  // const token = req.headers.Authorization;. Play around with this next weekend.
  const getAuth = req.headers.token;

  const token = getAuth as string;

  // Check if token is undefined
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (!process.env.SKEY) {
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }

  jwt.verify(token as string, process.env.SKEY, (err, user) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      req.user = user as string; // Explicitly cast user to string
      console.log(user, "this is the user");
      next();
    }
  });
}

export default authenticate;
