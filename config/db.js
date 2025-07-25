const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "ankababu",
  database: "inventory",
  password: "523919578",
  port: 5432
});

module.exports = pool;