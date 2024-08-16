const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  s: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },

});

module.exports = mongoose.model("Subject", subjectSchema);
