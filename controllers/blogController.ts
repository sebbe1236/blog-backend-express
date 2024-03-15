import { Request, Response, NextFunction } from "express";
import { queryDB } from "../db/dataBase";

async function getBlog(req: Request, res: Response, next: NextFunction) {
  const sql = "SELECT * FROM blogs WHERE id = ?";
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

async function getBlogs(req: Request, res: Response, next: NextFunction) {
  //blogs and comments are fetched together from sql, and then conditionally rendered in frontend based on if user is logged in.
  const sql =
    "SELECT blogs.*, comments.comment, comments.created_at, users.username FROM blogs INNER JOIN comments ON blogs.id = comments.blog_id INNER JOIN users ON comments.user_id = users.id";
  try {
    const result = await queryDB(sql);
    const blogs = {} as any;

    // the result is mapped through and the blog is added to the blog object if it does not exist. the reason for this check if it is not there is that we do not want the blog object to be created as duplicate/multiple times. If it is there the first foreach loop with the ! operator will return false.
    // this is to avoid multiple blogs of the same blog. If the blog is not there, it will be created. If it is already there it will skip creating the blog object and just push the comments to that blog in the comments[] array.
    result.forEach((row: any) => {
      if (!blogs[row.id]) {
        blogs[row.id] = {
          id: row.id,
          title: row.title,
          text: row.text,
          created_at: row.created_at,
          comments: [],
        };
      }
    });

    // maps through the response and adds the comments as a array to store multiple to one blog to the blog object if it has a comment attached to it from the sql query.
    // the comments[] is added to the blog object, and the comments are added to that array as part of the blogs object sent as a response to the frontend.
    result.forEach((row: any) => {
      blogs[row.id].comments.push({
        comment: row.comment,
        created_at: row.created_at,
        username: row.username,
      });
    });

    res.status(200).json(Object.values(blogs));
    console.log(result, "blogs and comments, rendered conditionally in frontend the blogs");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error, please try again later." });
  } finally {
    console.log("get all comments and with the blog connected to them a blog call over");
  }
}

export { getBlogs, getBlog };
