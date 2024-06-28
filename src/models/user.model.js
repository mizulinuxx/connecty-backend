const mysql = require("mysql2/promise");
const dbConfig = require("../db/config.js");
const crypto = require("node:crypto");

async function createNewUser(firstname, lastname, email, username, password) {
  if (
    typeof firstname != "string" &&
    typeof lastname != "string" &&
    typeof email != "string" &&
    typeof username != "string" &&
    typeof password != "string"
  )
    throw new Error("Inputs should be typeof STRING");

  // Create a new user in the database
  const pool = await mysql.createPool(dbConfig);
  const connection = await pool.getConnection();

  const createSalt = () => crypto.randomBytes(32).toString("base64");
  const salt = createSalt();

  try {
    // Check if user already exists
    const checkQuery = "SELECT * FROM users WHERE email = ? OR username = ?";
    const checkValues = [email, username];
    const [checkResults] = await connection.query(checkQuery, checkValues);

    if (checkResults[0]) {
      console.error("User already exists");
      return false;
    }
    // Create user if doesn't exists

    const hash = crypto.createHmac("sha256", salt).update(password).digest("hex");

    const query = "INSERT INTO users(firstname, lastname, email, username, password, salt) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [firstname, lastname, email, username, hash, salt];
    await connection.execute(query, values);

    return true;
  } catch (error) {
    console.error("Something went wrong:", error.message);
    throw new Error(error.message);
  } finally {
    connection.release();
  }
}

module.exports = createNewUser;
