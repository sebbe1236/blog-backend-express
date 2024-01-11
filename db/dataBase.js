const { createPool } = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const dbConnect = createPool({
  port: process.env.PORT,
  host: process.env.DBHOST,
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DB,
});

dbConnect.getConnection((error, connection) => {
  if (error) {
    console.error("Error connecting to the database:", error);
  } else {
    console.log("Connected to the database!");
    // Release the connection back to the pool
    connection.release();
  }
});

module.exports = dbConnect;
