import { Router } from "express";
import { authenticate } from "../middleware/auth/auth";
import { getComments, getComment, postComment } from "../controllers/commentController";
const router = Router();

router.get("", authenticate, getComments);

router.get("/comment/:id", authenticate, getComment);

router.post("/", authenticate, postComment);

module.exports = router;
