import { Request, Response, NextFunction } from "express";

import { queryDB } from "../db/dataBase";

async function getReplies(req: Request, res: Response, next: NextFunction) {
  const sqlparam =
    "SELECT replies.*, comments.*, users.username FROM comments JOIN replies ON comments.id = replies.comment_id JOIN users ON replies.user_id = users.id WHERE comments.id = ? ORDER BY replies.comment_id ASC";
  const sql =
    "SELECT replies.*, comments.*, users.username FROM comments JOIN replies ON comments.id = replies.comment_id JOIN users ON replies.user_id = users.id WHERE comments.id = ? ORDER BY replies.comment_id ASC";
  const commentId = req.params.id;

  try {
    const result = await queryDB(sql, [commentId]);
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
  // user_id is added to identify which user replied through the jwt token sent from frontend.

  console.log("req user id", req.user_id, "req body", req.body, "request body");
  const sql = "INSERT INTO replies(reply, comment_id,user_id,  created_at) VALUES(?, ?, ?, NOW())";
  const { reply, comment_id } = req.body as { reply: string; comment_id: number };
  const user = req.user_id;
  try {
    const result = await queryDB(sql, [reply, comment_id, user]);
    res.status(200).json({ data: result, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
}

export { getReplies, getReply, postReply };
