
const express = require('express');
const router = express.Router();
const examController = require("../controllers/examController");

router.post("/create-exam", examController.createExam);
router.get("/:subjectId", examController.getAllExam);
router.post("/:examId/start", examController.startExam);
router.post("/:examId/stop", examController.stopExam);

router.post("/submit-exam", examController.submitExam);

router.post("/:examId/student", examController.getExam);

router.get("/getActiveExams/:id", examController.getActiveExams);


module.exports = router;
