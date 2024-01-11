const db = require("../db/dataBase");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const saltRounds = 10;
dotenv.config();
const jwt = require("jsonwebtoken");

async function login(req, res, next) {
  const sql = "SELECT * FROM users WHERE username = ? AND email = ?";
  const { username, password, email } = req.body;
  console.log(req.body, "data sent");
  let token;
  try {
    const [fields, rows] = await db.query(sql, [username, email]);
    console.log(rows, "rows");

    // check if fields contain valid values and length is over > 0 then generate jwt token
    if (Array.isArray(fields) && fields.length > 0) {
      // check if password matches hashed password in the database using bcrypt
      const storedPassword = fields[0].password;

      const passwordMatch = await bcrypt.compare(password, storedPassword);
      // if password used to log in matches then generate jwt token
      if (passwordMatch) {
        token = jwt.sign({ id: rows[0].id }, process.env.SKEY, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
      }
      console.log(fields);
      // send response
      res.status(200).json({ success: true, data: fields, token: token });
    }
    // check if fields contains invalid values
    else if (fields.length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  } finally {
    console.log("login request over");
  }
}

async function register(req, res, next) {
  // to hash password use bcrypt with the .hash() method
  const { username, email, password } = req.body;
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  // hash password using bcrypt for new user
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const [fields, rows] = await db.query(sql, [username, email, hashedPassword]);
    console.log(fields, "fields");
    console.log(rows, "rows");
    // send response
    res.status(200).json({ success: true, data: fields });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  } finally {
    console.log("register request over");
  }
}

module.exports = { login, register };
