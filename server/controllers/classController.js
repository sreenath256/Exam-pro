const Class = require("../models/Class");

exports.getClasses = async (req, res) => {
  try {
    const cls = await Class.find({institute:req.user._id});
    res.json(cls);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createClasses = async (req, res) => {
    const { name } = req.body;
    try {
      const cls = new Class({ name, institute: req.user._id });
      await cls.save();
      res.status(201).json(cls);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
