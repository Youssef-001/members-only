const db = require("../db/queries");
async function addMember(req, res) {
  console.log(req.body);
  let user = await db.addMember(req.body);
}

module.exports = { addMember };
