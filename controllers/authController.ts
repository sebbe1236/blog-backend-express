import dotenv from "dotenv";
import { queryDB } from "../db/dataBase";
import { NextFunction, Request, Response } from "express";
const bcrypt = require("bcrypt");
const passwordValidation = require("../middleware/auth/passwordValidation");
const saltRounds = 10;
dotenv.config();
const jwt = require("jsonwebtoken");
const jwtManager = require("../middleware/auth/jwtManager");

async function login(req: Request, res: Response, next: NextFunction) {
  const sql = "SELECT * FROM users WHERE username = ? AND email = ?";
  const { username, password, email } = req.body;
  console.log(req.body, "data sent");
  if (!username || !password || !email) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  let token;
  try {
    const result = await queryDB(sql, [username, email]);
    console.log(result, "rows");

    // check if fields contain valid values and length is over > 0 then generate jwt token
    if (Array.isArray(result) && result.length > 0) {
      // check if password matches hashed password in the database using bcrypt
      const storedPassword = result[0].password;

      const passwordMatch = await passwordValidation(password, storedPassword);
      // if password used to log in matches then generate jwt token
      if (passwordMatch) {
        token = await jwtManager(result[0].id);
      }
      console.log(result, "this is the result of login");
      // send response
      res.status(200).json({ success: true, data: result, token: token });
    }
    // check if fields contains invalid values
    else if ((result as any[]).length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  } finally {
    console.log("login request over");
  }
}

async function register(req: Request, res: Response, next: NextFunction) {
  // to hash password use bcrypt with the .hash() method
  const { username, email, password } = req.body;
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  // hash password using bcrypt for new user
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const result = await queryDB(sql, [username, email, hashedPassword]);
    console.log(result, "fields");
    console.log(result, "rows");
    // send response
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  } finally {
    console.log("register request over");
  }
}

module.exports = { login, register };
