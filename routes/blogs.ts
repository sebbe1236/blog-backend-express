import { Router } from "express";
import { getBlogs, getBlog } from "../controllers/blogController";
// import { authenticate } from "../middleware/auth/auth";
// import { get } from "http";
const router = Router();

router.get("", getBlogs);

router.get("/blog/:id", getBlog);

//router.get("", getBlogs);

module.exports = router;
