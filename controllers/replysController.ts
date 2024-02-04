import { Request, Response, NextFunction } from "express";
import { queryDB } from "../db/dataBase";

async function getReplies(req: Request, res: Response, next: NextFunction) {
  const sql = "SELECT * FROM replies";
  try {
    const result = await queryDB(sql);
    res.status(200).json({ data: result, message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
}

async function getReply(req: Request, res: Response, next: NextFunction) {
  const sql = "SELECT * FROM replies WHERE id = ?";
  const { id } = req.params;
  try {
    const result = await queryDB(sql, [id]);
    res.status(200).json({ data: result, message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
}

async function postReply(req: Request, res: Response, next: NextFunction) {
  const sql = "INSERT INTO replies(reply, user_id, post_id) VALUES(?, ?, ?)";
  const { reply, user_id, post_id } = req.body as { reply: string; user_id: number; post_id: number };
  try {
    const result = await queryDB(sql, [reply, user_id, post_id]);
    res.status(200).json({ data: result, message: "Reply posted to comment" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
}

export { getReplies, getReply, postReply };
