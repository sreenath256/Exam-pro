const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  score: { type: Number, required: true },
  passed: { type: Boolean, required: true },
  submittedAt: { type: Date, default: Date.now },
  class:{ type: mongoose.Schema.Types.ObjectId, ref: 'Classr', required: true },
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;