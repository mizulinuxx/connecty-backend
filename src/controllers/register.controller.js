const createNewUser = require("../models/user.model.js"); 

function register(req,res){

  const {firstname, lastname, email, username, password} = req.body;

  // Encrypt password;
  

  try{
    // Create new user
    const newUser = createNewUser(firstname, lastname, email, username, password);
    console.log(newUser);

  }catch(error){
    console.error("Internal Server Error", error.message);
    res.status(500).json({status: "error", message: "Internal Server Error"});
  }

}

module.exports = register;
