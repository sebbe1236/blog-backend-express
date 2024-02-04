import { Request, Response, NextFunction } from "express";

import { queryDB } from "../db/dataBase";

async function getBlogs(req: Request, res: Response, next: NextFunction) {
  const sql = "SELECT * FROM blogs";

  try {
    console.log("Executing query:", sql);
    const result = await queryDB(sql);
    console.log("Query result:", result);
    console.log("Sending response...");

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.log(err);
  } finally {
    console.log("get all blog posts call over");
  }
}

async function getBlog(req: Request, res: Response, next: NextFunction) {
  const sql = "SELECT * FROM blogs WHERE post_id = ?";
  const { id } = req.params;
  try {
    const result = await queryDB(sql, [id]);
    console.log("successfully got 1 blog post");
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.log(err);
  } finally {
    console.log("get 1 blog post call over");
  }
}

export { getBlogs, getBlog };
