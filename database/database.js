import pg from "pg";

const { Pool } = pg;
const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";

console.log(`Using the database ${process.env.DB_DATABASE}.`);

const connection = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

export default connection;
