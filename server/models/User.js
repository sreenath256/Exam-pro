const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["institute", "student"],
      required: true,
    },
    institute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    class:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Class"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
