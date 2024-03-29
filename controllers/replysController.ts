import { Request, Response, NextFunction } from "express";

import { queryDB } from "../db/dataBase";

async function getReplies(req: Request, res: Response, next: NextFunction) {
  const sql =
    "SELECT replies.*, comments.comment, users.username FROM replies JOIN comments ON replies.comment_id = comments.id JOIN users ON replies.user_id = users.id WHERE comments.id = ?";
  try {
    const result = await queryDB(sql);
    res.status(200).json({ data: result, message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  } finally {
    console.log("get all replies call over");
  }
}

async function getReply(req: Request, res: Response, next: NextFunction) {
  const sql = "SELECT * FROM replies WHERE id = ?";
  const id = req.params.id;
  try {
    const result = await queryDB(sql, [id]);
    res.status(200).json({ data: result, message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
}

async function postReply(req: any, res: Response, next: NextFunction) {
  // Reply linked to a comment with comment_id sent as id in the request body from frontend.
  //The user_id is sent as a token in the request header.
  // the id of the comment is extracted from the comments loop, and then sent as parameter in the postReply post req in frontend.

  console.log("req user id", req.user_id, "req body", req.body, "request body");
  const sql = "INSERT INTO replies(reply, comment_id, created_at) VALUES(?, ?, NOW())";
  const { reply, comment_id } = req.body as { reply: string; comment_id: number };
  const user = req.user_id;
  try {
    const result = await queryDB(sql, [reply, comment_id]);
    res.status(200).json({ data: result, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
}

export { getReplies, getReply, postReply };
