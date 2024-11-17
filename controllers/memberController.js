const db = require("../db/queries");
async function addMember(req, res) {
  console.log(req.body);
  let user = await db.addMember(req.body);
}

async function getMemberShip(req, res) {
  if (req.body.secret == "secret") {
    console.log(req.session.passport.user);
    await db.giveMembership(req.session.passport.user);
  } else {
    //
  }

  res.redirect("/");
}

module.exports = { addMember, getMemberShip };
