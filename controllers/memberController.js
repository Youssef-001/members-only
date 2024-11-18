const db = require("../db/queries");
async function addMember(req, res) {
  console.log(req.body);
  let members = await db.getAllMembers();
  let emailExist = false;

  for (let i = 0; i < members.length; i++) {
    if (members[i].email == req.body.email) {
      emailExist = true;
      break;
    }
  }

  if (!emailExist) {
    let user = await db.addMember(req.body);
  } else {
    //
  }
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
