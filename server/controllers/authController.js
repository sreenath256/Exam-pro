const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Institute = require("../models/Institute");

exports.instituteRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const institute = await Institute.findOne({ email }).select("-password");
    if (institute)
      return res.status(400).json({ message: "Institute already exist. " });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newInstitute = new Institute({
      name,
      email,
      password: hashedPassword,
    });
    await newInstitute.save();
    const token = jwt.sign(
      { instituteId: newInstitute._id },
      process.env.JWT_SECRET
    );
    res.status(201).json({ token, institute:newInstitute });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.instituteLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(req.body);
    
    const institute = await Institute.findOne({ email })
    if (!institute || !(await bcrypt.compare(password, institute.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { instituteId: institute._id },
      process.env.JWT_SECRET
    );
    res.json({ token, institute });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
