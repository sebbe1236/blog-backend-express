const logger = require("./middleware/handlers/logger");
const blogsRouter = require("./routes/blogs");
const replyRouter = require("./routes/replys");
const commentsRouter = require("./routes/comments");
const authRouter = require("./routes/auth");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const errorHandler = require("./middleware/handlers/errorHandler");
const notFoundError = require("./middleware/handlers/notFoundError");

const app = express();

const PORT = 3002;
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
// logging of requests
app.use(logger);
// routes
app.use("/v1/blogs", blogsRouter);

app.use("/v1/replies", replyRouter);

app.use("/v1/comments", commentsRouter);

app.use("/v1/auth", authRouter);

app.use(errorHandler, notFoundError);

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
