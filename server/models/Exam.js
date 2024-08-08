// models/Exam.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  mark: { type: Number, required: true }
});

const examSchema = new mongoose.Schema({
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  questions: [questionSchema],
  passMark: { type: Number, required: true },
  isActive: { type: Boolean, default: false },
  results: [{ student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }, marks: Number, passed: Boolean }]
});

module.exports = mongoose.model('Exam', examSchema);
