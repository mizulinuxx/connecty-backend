const mysql = require("mysql2/promise");
const dbConfig = require("../db/config.js");

async function createNewUser(firstname,lastname,email,username,password){
	if(typeof firstname != "string" && 
		 typeof lastname != "string" && 
		 typeof email  != "string" &&
		 typeof username != "string" &&
		 typeof password != "string") throw new Error("Inputs should be typeof STRING")

  // Create a new user in the database
  const pool = await mysql.createPool(dbConfig);
  const connection = await pool.getConnection();

  try{
    // Check if user already exists
    const checkQuery= "SELECT * FROM users WHERE email = ? OR username = ?";
    const checkValues = [email, username];
    const [checkResults] = await connection.query(checkQuery,checkValues);
    
    if(checkResults[0]) throw new Error("User already exists");
    
    // Create user if doesn't exists
    const query = "INSERT INTO users(firstname, lastname, email, username, password) VALUES (?, ?, ?, ?, ?)";
    const values = [firstname, lastname, email, username, password];
    await connection.query(query, values)
    
  
  }catch(error){
    console.error("Something went wrong:", error.message);
    throw new Error(error.message);
  }finally{
    connection.release();
  }
}

module.exports = createNewUser;
