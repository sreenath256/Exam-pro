
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

router.get("/:id", userController.getUserById);
router.post("/create-student", userController.createStudent);
router.get("/getAllStudents/:id", userController.getAllStudents);

module.exports = router;
