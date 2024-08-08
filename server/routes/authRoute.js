
const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.instituteRegister);
router.post("/login", authController.instituteLogin);

module.exports = router;
