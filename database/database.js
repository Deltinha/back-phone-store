import pg from "pg";

const { Pool } = pg;

let database;

if (process.env.NODE_ENV === "test") {
  database = "phone_store_test";
} else {
  database = "phone_store";
}

const connection = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "delta",
  database,
});

export default connection;
