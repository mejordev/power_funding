import { Pool } from "pg";

const dbClient = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default dbClient;
