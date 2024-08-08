
const express = require('express');
const router = express.Router();

router.post("/:id", authController.instituteRegister);

module.exports = router;
