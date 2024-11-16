const db = require("../db/queries");

async function createMessage(req, res) {}

async function getMessages(req, res) {
  let messages = await db.getMessages();
  let userId = req.session.passport.user;
  let user = await db.getUserById(userId);
  console.log(user);
  if (user.membership == false) {
    res.render("messageBoard", { messages });
  } else {
    console.log("yes");
    messages = await db.getMessagesWithAuthor();

    for (let i = 0; i < messages.length; i++) {
      messages[i] = {
        ...messages[i],
        author: `${messages[i].firstname} ${messages[i].lastname}`,
      };
    }

    res.render("messageBoard", { messages });
  }
}

module.exports = { getMessages };
