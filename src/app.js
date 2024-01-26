import express from "express";
import path from "path";
import morgan from "morgan";
import { pool } from "./db.js";


import customerRoutes from "./routes/customer.routes.js";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

async function checkAndCreateCustomerTable() {
    try {
      const [rows, fields] = await pool.query("SHOW TABLES LIKE 'customer'");
      if (rows.length === 0) {
        await pool.query(`
          CREATE TABLE customer (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            address VARCHAR(100) NOT NULL,
            phone VARCHAR(15)
          )
        `);
        console.log("Customer table created successfully.");
      } else {
        console.log("Customer table already exists.");
      }
    } catch (error) {
      console.error("Error checking or creating customer table:", error);
    }
  }
  

checkAndCreateCustomerTable();

// routes
app.use(customerRoutes);

// static files
app.use(express.static(path.join(__dirname, "public")));

// starting the server
export default app;
