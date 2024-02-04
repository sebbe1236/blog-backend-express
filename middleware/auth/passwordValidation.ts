const bcrypt = require("bcrypt");

async function passwordValidation(inputPassword: any, hashedPassword: any) {
  const passwordMatch = bcrypt.compare(inputPassword, hashedPassword);

  if (passwordMatch) {
    return true;
  } else {
    return false;
  }
}

module.exports = passwordValidation;
