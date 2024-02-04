const jwt = require("jsonwebtoken");

async function jwtManager(id: number) {
  const token = jwt.sign({ id: id }, process.env.SKEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
}

module.exports = jwtManager;
