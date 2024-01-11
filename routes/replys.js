const { Router } = require("express");
const replyController = require("../controllers/replysController");
const router = Router();

router.get("/replies", replyController.getReplies);

router.get("/reply", replyController.getReply);

router.post("/respond", replyController.postReply);

module.exports = router;
