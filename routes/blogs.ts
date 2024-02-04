import { Router } from "express";
const blogsController = require("../controllers/blogController");
const router = Router();

router.get("", blogsController.getBlogs);

router.get("/blog/:id", blogsController.getBlog);

module.exports = router;
