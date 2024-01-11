const db = require("../db/dataBase");

async function getBlogs(req, res, next) {
  const sql = "SELECT * FROM blogs";

  try {
    const [fields, rows] = await db.query(sql);
    console.log(rows, fields, "this connected");
    res.status(200).json({ success: true, data: fields });
  } catch (err) {
    console.log(err);
  } finally {
    console.log("get all blog posts call over");
  }
}

async function getBlog(req, res, next) {
  res.send("this is a get blog function");
}

module.exports = {
  getBlogs,
  getBlog,
};
