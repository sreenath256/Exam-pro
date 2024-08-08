// models/Subject.js
const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  institute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institute",
    required: true,
  },
});

module.exports = mongoose.model("Subject", subjectSchema);
