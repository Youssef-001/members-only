const pool = require("./pool");

async function addMember(member) {
  const { rows } = await pool.query(
    `INSERT INTO members (firstName, lastName, email, password) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`, // Optional: Use RETURNING to get the inserted row back
    [member.firstName, member.lastName, member.email, member.password]
  );

  console.log(rows);
  return rows[0]; // Return the first row if there's one
}

async function getUserByEmail(email) {
  const { rows } = await pool.query(`SELECT * FROM members WHERE email=$1`, [
    email,
  ]);

  if (rows) return rows[0];
  return null;
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM members WHERE id=$1", [id]);
  if (rows) return rows[0];
  else return null;
}

async function createMessage(message) {
  let { rows } = pool.query("INSERT INTO messages ()");
}

async function getMessages() {
  let { rows } = await pool.query("SELECT * FROM messages");
  console.log(rows);
  return rows;
}
async function getMessagesWithAuthor() {
  let { rows } = await pool.query(
    `SELECT * FROM messages JOIN members ON messages.author = members.id;`
  );

  return rows;
}

async function addMessage(message) {
  // title,timestamp, body, author;

  await pool.query(
    `INSERT INTO messages (title,timestamp, body, author) VALUES ($1, $2, $3, $4)`,
    [message.title, message.timestamp, message.body, message.author]
  );
}

async function giveMembership(id) {
  await pool.query(`UPDATE members SET membership=true WHERE id=$1`, [id]);
}

module.exports = {
  addMember,
  getUserByEmail,
  getUserById,
  createMessage,
  getMessages,
  getMessagesWithAuthor,
  addMessage,
  giveMembership,
};
