let pool = require("./pool");
const { Client } = require("pg");

const SQL = `CREATE TABLE members (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   firstName VARCHAR (255),
   lastName VARCHAR (255),
   email VARCHAR (255),
   password VARCHAR ( 255 ),
  isAdmin BOOLEAN DEFAULT false
)`;

const SQL2 = `
CREATE TABLE messages (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
title TEXT,
timestamp TEXT,
body TEXT,
author INTEGER

)
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://postgres:root@localhost:5432/top_users",
  });
  await client.connect();
  await client.query(SQL);
  await client.query(SQL2);
  await client.end();
  console.log("done");
}

main();
