const Subject = require("../models/Subject");

exports.getSubject = async (req, res) => {
  try {
    const subjects = await Subject.find({institute:req.user._id});
    res.json(subjects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createSubject = async (req, res) => {
    const { name } = req.body;
    try {
      const subject = new Subject({ name, institute: req.user._id });
      await subject.save();
      res.status(201).json(subject);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
