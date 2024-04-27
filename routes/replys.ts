import { Router } from "express";
import { getReplies, getReply, postReply } from "../controllers/replysController";
import { authenticate } from "../middleware/auth/auth";
const router = Router();

router.get("", authenticate, getReplies);

router.get("/reply", authenticate, getReply);

router.post("", authenticate, postReply);

module.exports = router;
