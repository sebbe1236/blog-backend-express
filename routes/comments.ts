import { Router } from "express";
import { authenticate } from "../middleware/auth/auth";
import { getComment, getComments, postComment, getCommentSpecificBlog } from "../controllers/commentController";

const router = Router();

//set up route to get single blogComment and linked the comments to a specific blog.
// next up is to link that to be displayed for each blog/together with that blog in the frontend

router.get("", authenticate, getComments);

router.get("/:blog_id", authenticate, getCommentSpecificBlog);

router.get("/comment/:id", authenticate, getComment);

router.post("/", authenticate, postComment);

module.exports = router;
