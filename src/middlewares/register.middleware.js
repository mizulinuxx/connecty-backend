function checkRegister(req, res, next) {
  const { firstname, lastname, email, username, password } = req.body;

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const usernameRegex = /^[^\s]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  try {
    if (!emailRegex.test(email)) throw new Error("Email is not a valid format");
    if (!usernameRegex.test(username)) throw new Error("Username is not a valid format");
    if (!passwordRegex.test(password)) throw new Error("Password is not a valid format");

    next();
  } catch (error) {
    console.error("Internal Server Error", error.message);
    res.status(500).json({ status: "Internal Server Error", message: error.message });
  }
}

module.exports = checkRegister;
