const Exam = require("../models/Exam");

exports.createExam = async (req, res) => {
  const {
    subjectId,
    examQuestionsNumber,
    marksPerQuestion,
    questions,
    passMark,
    examName,
    isActive,
  } = req.body;

  try {
    const exam = new Exam({
      institute: req.user._id,
      subject: subjectId,
      examName,
      questions,
      displayQuestionNumber: examQuestionsNumber,
      passMark,
      markForEach: marksPerQuestion,
      isActive,
    });
    await exam.save();
    res.status(201).json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getExam = async (req,res)=>{
    const { subjectId } = req.params;
    console.log(subjectId,req.user._id);
    

  try {
    // Find exams based on institute and subject
    const exams = await Exam.find({ institute: req.user._id, subject: subjectId });

    if (!exams.length) {
      return res.status(404).json({ message: 'No exams found for this subject.' });
    }

    // Send the retrieved exams as a response
    res.status(200).json(exams);
  } catch (error) {
    // Handle errors and send a 500 response
    console.error("Error retrieving exams:", error);
    res.status(500).json({ error: 'Server error' });
  }
    
}


exports.startExam = async (req, res) => {
    const { examId } = req.params;
    try {
      const exam = await Exam.findOne({_id:examId,institute:req.user._id});
      if (!exam ) {
        return res.status(403).json({ message: 'No exam found' });
      }
      exam.isActive = 'active';
      
      await exam.save();
      res.json(exam);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  exports.stopExam = async (req, res) => {
    const { examId } = req.params;
    try {
      const exam = await Exam.findOne({_id:examId,institute:req.user._id});
      if (!exam ) {
        return res.status(403).json({ message: 'No exam found' });
      }
      exam.isActive = 'completed';
      
      await exam.save();
      res.json(exam);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  