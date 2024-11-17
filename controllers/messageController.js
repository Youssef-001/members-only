const db = require("../db/queries");

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function createMessage(req, res) {
  console.log(req.session.passport.user);
  let authorId = req.session.passport.user;
  console.log(req.body);
  let now = new Date();
  let date = formatDate(now);

  let message = {
    timestamp: date,
    author: authorId,
    title: req.body.title,
    body: req.body.message,
  };

  await db.addMessage(message);

  res.redirect("/");
}

async function getMessages(req, res) {
  let messages = await db.getMessages();
  let userId = req.session.passport.user;
  let user = await db.getUserById(userId);
  console.log(user);
  if (user.membership == false) {
    res.render("messageBoard", { messages, membership: user.membership });
  } else {
    console.log("yes");
    messages = await db.getMessagesWithAuthor();

    for (let i = 0; i < messages.length; i++) {
      messages[i] = {
        ...messages[i],
        author: `${messages[i].firstname} ${messages[i].lastname}`,
      };
    }
    if (user.membership == true) {
      res.render("messageBoard", { messages, membership: true });
    } else {
      res.render("messageBoard", { messages, membership: false });
    }
  }
}

module.exports = { getMessages, createMessage };
