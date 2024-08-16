const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

const examSchema = new mongoose.Schema({
  institute: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },

  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  examName: {
    type: String,
    required: true,
  },
  questions: [questionSchema],
  displayQuestionNumber: { type: Number },
  passMark: { type: Number },
  markForEach: { type: Number },
  questionFilePath: {
    type: String,
  },
  examType: {
    type: String,
    enum: ["fileUpload", "manually"],
    required: true,
  },
  answers: {
    type: [String],
  },
  questionsCount: {
    type: Number,
  },
  isActive: {
    type: String,
    enum: ["pending", "active", "completed"],
    required: true,
  },
  results: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
      marks: Number,
      passed: Boolean,
    },
  ],
  completedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Exam", examSchema);
