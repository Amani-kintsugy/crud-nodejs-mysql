import { createPool } from "mysql2/promise";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const pool = createPool({
  host: "mysql",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 3306,
  database: "sampledb",
});
