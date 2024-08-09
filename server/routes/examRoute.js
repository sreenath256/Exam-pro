
const express = require('express');
const router = express.Router();
const examController = require("../controllers/examController");

router.post("/create-exam", examController.createExam);
router.get("/:subjectId", examController.getExam);
router.post("/:examId/start", examController.startExam);
router.post("/:examId/stop", examController.stopExam);

module.exports = router;
