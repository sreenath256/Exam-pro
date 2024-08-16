
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

router.get("/:id", userController.getUserById);
router.post("/create-student", userController.createStudent);
router.get("/getAllStudents/:id", userController.getAllStudents);
router.get("/getStudentsByClass/:classId", userController.getStudentsByClass);

module.exports = router;
