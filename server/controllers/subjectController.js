const Subject = require("../models/Subject");

exports.getSubject = async (req, res) => {
  try {
    const { cls } = req.body;
    

    const subjects = await Subject.find({
      institute: req.user._id,
      class: cls,
    });
    res.json(subjects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createSubject = async (req, res) => {
  const { name, cls } = req.body;
  try {
    const subject = new Subject({ name, institute: req.user._id, class: cls });
    await subject.save();
    res.status(201).json(subject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
