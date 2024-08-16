const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.createStudent = async (req, res) => {
  const { name, email, password, institute, classId } = req.body;

  try {
    const user = await User.findOne({ email }).select("-password");
    if (user) return res.status(400).json({ message: "Email already exist. " });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      class: classId,
      role: "student",
      institute: institute,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.find({ institute: id })
      .select("-password")
      .populate("class");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getStudentsByClass = async (req, res) => {
  try {
    const classId = req.params.classId;

    

    const user = await User.find({ institute: req.user._id, class: classId })
      .select("-password")
      .populate("class");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
