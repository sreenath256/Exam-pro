
const express = require('express');
const router = express.Router();
const examController = require("../controllers/examController");

router.post("/create-exam", examController.createExam);
router.get("/:subjectId", examController.getAllExam);
router.post("/:examId/start", examController.startExam);
router.post("/:examId/stop", examController.stopExam);

router.post("/submit-exam", examController.submitExam);

router.post("/:examId/student", examController.getExam);
router.post("/:examId/result", examController.fetchExambyExamId);

router.get("/getActiveExams/:id", examController.getActiveExams);
router.get("/getCompletedExams/:id", examController.getCompletedExam);
router.post("/getStudentResult/:examId", examController.fetchExamResultByStudent);


module.exports = router;
