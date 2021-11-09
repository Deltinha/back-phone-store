import pg from "pg";

const { Pool } = pg;

console.log(`Using the database ${process.env.DB_DATABASE}.`);

const databaseConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

const connection = new Pool(databaseConfig);

export default connection;
