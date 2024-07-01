const createNewUser = require("../models/user.model.js");
const crypto = require("node:crypto");

async function register(req, res) {
  const { firstname, lastname, email, username, password } = req.body;
  try {
    // Create new user
    const newUser = await createNewUser(firstname, lastname, email, username, password);
    if (!newUser) return res.status(409).json({ status: "error", message: "User already exists" });
    return res.status(200).json({ status: "success", message: "User created" });
  } catch (error) {
    console.error("Internal Server Error", error.message);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}

module.exports = register;
