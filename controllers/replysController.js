async function getReplies(req, res, next) {
  res.send("this is getting all the replies");
}

async function getReply(req, res, next) {
  res.send("this is getting a single reply");
}

async function postReply(req, res, next) {
  res.send("this is posting a reply");
}

module.exports = {
  getReplies,
  getReply,
  postReply,
};
