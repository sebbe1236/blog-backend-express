const { Router } = require("express");
const commentController = require("../controllers/commentController");

const router = Router();

router.get("/", commentController.getComments);

router.get("/comment/:id", commentController.getComment);

router.post("/", commentController.postComment);

module.exports = router;
