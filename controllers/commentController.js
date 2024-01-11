async function getComments(req, res, next) {
  const sql = "SELECT * FROM comments";

  try {
    const [rows, cols] = await db.query(sql);
    console.log(rows, cols, "getting all the comments");
    res.status(200).json({ success: true, data: rows });
  } catch (err) {
    res.status(500);
    console.log(err);
  } finally {
    console.log("get all comments call over");
  }

  res.send("this is getting all the comments");
}

async function getComment(req, res, next) {
  const sql = "SELECT * FROM comments WHERE id = ?";
  res.send("this is getting a single comment");
}

async function postComment(req, res, next) {
  const { comment } = req.body;
  const sql = "INSERT INTO comments (comment) VALUES (?)";

  try {
    const [rows, cols] = await db.query(sql, [comment]);
    console.log(rows, cols, "posting a new comment");
    res.status(200).json({ success: true, data: cols });
  } catch (err) {
    res.status(500);
    console.log(err);
  } finally {
    console.log("post comment call over");
  }
  res.send("this is posting a new comment");
}

module.exports = {
  getComments,
  getComment,
  postComment,
};
