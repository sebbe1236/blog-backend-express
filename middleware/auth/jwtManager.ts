const jwt = require("jsonwebtoken");

async function jwtManager(user_id: number) {
  const token = jwt.sign({ id: user_id }, process.env.SKEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
}

module.exports = jwtManager;
