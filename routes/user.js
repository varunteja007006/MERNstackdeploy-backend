const express = require("express");
//express router
const router = express.Router();

const { loginUser, signupUser } = require("../controllers/userController");

//login router
router.post("/login", loginUser);

//signup router
router.post("/signup", signupUser);

module.exports = router;
