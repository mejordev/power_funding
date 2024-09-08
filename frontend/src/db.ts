import { Pool } from "pg";

const dbClient = new Pool({
  connectionString: process.env.DATABASE_URL,
  // You can also specify other options like max: 10, idleTimeoutMillis: 30000, etc.
  // max: 20, // Maximum number of clients in the pool
  // idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
});

export default dbClient;
