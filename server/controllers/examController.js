const Exam = require("../models/Exam");

exports.createExam = async (req, res) => {
  const {
    subjectId,
    examQuestionsNumber,
    marksPerQuestion,
    questions,
    passMark,
    examName,
    isActive,
    examType,
  } = req.body;

  try {
    const exam = new Exam({
      institute: req.user._id,
      subject: subjectId,
      examName,
      questions,
      examType,
      displayQuestionNumber: examQuestionsNumber,
      passMark,
      markForEach: marksPerQuestion,
      isActive,
    });
    await exam.save();
    res.status(201).json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createExamWithFile = async (req, res) => {
  const {
    subjectId,

    examType,
    answers,
    marksPerQuestion,
    passMark,
    examName,
    isActive,
  } = req.body;

  try {
    console.log(req.file.filename);
    // return console.log(req.body);
    const filePath = `/assets/${req.file.filename}`;
    const exam = new Exam({
      institute: req.user._id,
      subject: subjectId,
      examName,
      examType,
      answers,
      questionFilePath:filePath,
      passMark,
      markForEach: marksPerQuestion,
      isActive,
    });
    await exam.save();
    res.status(201).json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllExam = async (req, res) => {
  const { subjectId } = req.params;

  try {
    const exams = await Exam.find({
      institute: req.user._id,
      subject: subjectId,
    });

    if (!exams.length) {
      return res
        .status(404)
        .json({ message: "No exams found for this subject." });
    }

    res.status(200).json(exams);
  } catch (error) {
    console.error("Error retrieving exams:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.startExam = async (req, res) => {
  const { examId } = req.params;
  try {
    const exam = await Exam.findOne({ _id: examId, institute: req.user._id });
    if (!exam) {
      return res.status(403).json({ message: "No exam found" });
    }
    exam.isActive = "active";

    await exam.save();
    res.json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.stopExam = async (req, res) => {
  const { examId } = req.params;
  try {
    const exam = await Exam.findOne({ _id: examId, institute: req.user._id });
    if (!exam) {
      return res.status(403).json({ message: "No exam found" });
    }
    exam.isActive = "completed";

    await exam.save();
    res.json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const mongoose = require("mongoose");
const Result = require("../models/Result");

exports.getActiveExams = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Institute ID." });
  }

  try {
    const exams = await Exam.find({ institute: id, isActive: "active" });

    res.status(200).json(exams);
  } catch (error) {
    console.error("Error retrieving exams:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getExam = async (req, res) => {
  const { examId } = req.params;
  const { institute } = req.body;

  if (!mongoose.Types.ObjectId.isValid(institute)) {
    return res.status(400).json({ message: "Invalid Institute ID." });
  }

  try {
    const exams = await Exam.find({ institute: institute, _id: examId });

    if (!exams.length) {
      return res
        .status(404)
        .json({ message: "No exams found for this institute." });
    }

    res.status(200).json(exams);
  } catch (error) {
    console.error("Error retrieving exams:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.submitExam = async (req, res) => {
  const { examId, studentId, score } = req.body;

  // return console.log(examId,studentId,score);

  try {
    const exam = await Exam.findById(examId);

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    if (exam.completedStudents.includes(studentId)) {
      return res
        .status(400)
        .json({ message: "Student has already completed this exam" });
    }

    exam.completedStudents.push(studentId);

    const result = new Result({
      exam: examId,
      student: studentId,
      score,
      passed: score >= exam.passMark,
    });

    await result.save();

    await exam.save();

    res.status(200).json({ message: "Exam submitted successfully", result });
  } catch (error) {
    console.error("Error submitting exam:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.fetchExamResultByStudent = async (req, res) => {
  const { examId } = req.params;
  const { studentId } = req.body;

  console.log(examId, studentId);

  try {
    const result = await Result.findOne({
      exam: examId,
      student: studentId,
    }).populate({
      path: "exam",
      select: "examName passMark",
    });

    if (!result) {
      return res
        .status(404)
        .json({ message: "Result not found for this exam and student" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching exam result:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getCompletedExam = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Institute ID." });
  }

  try {
    const exams = await Exam.find({ institute: id, isActive: "completed" });

    if (!exams.length) {
      return res
        .status(404)
        .json({ message: "No exams found for this institute." });
    }

    res.status(200).json(exams);
  } catch (error) {
    console.error("Error retrieving exams:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.fetchExambyExamId = async (req, res) => {
  const { examId } = req.params;
  const { institute } = req.body;
  console.log(examId, institute);

  try {
    const result = await Result.find({ exam: examId }).populate({
      path: "student",
    });

    if (!result) {
      return res
        .status(404)
        .json({ message: "Result not found for this exam and institute" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching exam result:", error);
    res.status(500).json({ error: "Server error" });
  }
};
