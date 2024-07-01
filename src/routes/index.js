const express = require("express");
const router = express.Router();

const checkRegister = require("../middlewares/register.middleware.js");
const register = require("../controllers/register.controller.js");

// Auth Routes
router.post("/api/auth/register", checkRegister, register);

module.exports = router;
