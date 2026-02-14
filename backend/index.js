const express = require("express");
const { Client } = require("pg");

const app = express();
const port = 3000;

const client = new Client({
  host: "postgres",
  user: "appuser",
  password: "apppassword",
  database: "appdb",
});

client.connect()
  .then(() => console.log("Connected to Postgres"))
  .catch(err => console.error("DB error", err));

app.get("/", async (req, res) => {
  const result = await client.query("SELECT NOW()");
  res.json({ now: result.rows[0].now });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
