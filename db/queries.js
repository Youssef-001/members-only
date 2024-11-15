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

module.exports = {
  addMember,
};
