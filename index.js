const blogsRouter = require("./routes/blogs");
const replyRouter = require("./routes/replys");
const commentsRouter = require("./routes/comments");
const authRouter = require("./routes/auth");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

const PORT = 3002;
app.use(bodyParser.json());
app.use(cors());

app.use("/v1/blogs", blogsRouter);

app.use("/v1/replies", replyRouter);

app.use("/v1/comments", commentsRouter);

app.use("/v1/auth", authRouter);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
