import { queryDB } from "../db/dataBase";
import { Request, Response, NextFunction } from "express";

async function getComments(req: Request, res: Response, next: NextFunction) {
  const sql = "SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.user_id";

  try {
    const result = await queryDB(sql);
    console.log(result, "getting all the comments");
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(500);
    console.log(err);
  } finally {
    console.log("get all comments call over");
  }
}

async function getComment(req: Request, res: Response, next: NextFunction) {
  const sql = "SELECT * FROM comments WHERE id = ?";
  const { id } = req.params;
  try {
    const result = await queryDB(sql, [id]);
    console.log(result, "getting a single comment");
    res.status(200).json({ success: "successful response", data: result });
  } catch (err) {
    res.status(500);
    console.log(err);
  } finally {
    console.log("get single comment call over");
  }

  res.send("this is getting a single comment");
}

async function postComment(req: Request, res: Response, next: NextFunction) {
  const { comment } = req.body;
  const sql = "INSERT INTO comments (comment) VALUES (?)";

  try {
    const result = await queryDB(sql, [comment]);
    console.log(result, "posting a new comment");
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(500);
    console.log(err);
  } finally {
    console.log("post comment call over");
  }
  res.send("this is posting a new comment");
}

export { getComments, getComment, postComment };
