import { Request, Response, NextFunction } from "express";
import { queryDB } from "../db/dataBase";

// async function getBlogs(req: Request, res: Response, next: NextFunction) {
//   const sql = "SELECT * FROM blogs";
//   // had to replace by bottom function to sort the comments to that blog.
//   // it is conditional rendering in the frontend based if user is logged in or not.
//   try {
//     console.log("Executing query:", sql);
//     const result = await queryDB(sql);

//     console.log("Query result:", result);
//     console.log("Sending response...");

//     res.status(200).json({ success: true, data: result });
//   } catch (err) {
//     console.log(err);
//   } finally {
//     console.log("get all blog posts call over");
//   }
// }

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
    // map through result by row from the DB query and check if a object already contains this ID, if it does not created the object with the properties in blogs array.
    // ID is primary key here.
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

    // maps through the response and adds the comments to the blog object if it has a comment.
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
