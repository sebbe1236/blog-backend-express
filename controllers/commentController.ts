import { queryDB } from "../db/dataBase";
import { Request, Response, NextFunction } from "express";

interface RequestWithUser extends Request {
  user: {
    id: number;

    // other properties...
  };
}

async function getComments(req: Request, res: Response, next: NextFunction) {
  const sql =
    "SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.id ORDER BY comments.blog_id ASC";

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

async function getCommentSpecificBlog(req: Request, res: Response, next: NextFunction) {
  const blog_id = req.params.blog_id;
  console.log(blog_id, "this is the blog id");
  const sql =
    "SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.id WHERE comments.blog_id = ?";

  try {
    const result = await queryDB(sql, [blog_id]);
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

async function postComment(req: any, res: Response, next: NextFunction) {
  console.log(req.user_id, req.body, "request body");
  const { comment, id } = req.body;
  const user_id = req.user_id;
  const sql = "INSERT INTO comments (comment, user_id, blog_id, created_at) VALUES (?,?,?, NOW())";

  try {
    const result = await queryDB(sql, [comment, user_id, id]);
    res.status(200).json({ success: true, data: result });
    console.log(result, "posting a new comment");
  } catch (err) {
    res.status(500);
    console.log(err);
  } finally {
    console.log("post comment call over");
  }
}

export { getComments, getComment, postComment, getCommentSpecificBlog };
