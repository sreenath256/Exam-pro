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

exports.getAllExam = async (req,res)=>{
    const { subjectId } = req.params;
    

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
  

  const mongoose = require('mongoose');
const Result = require("../models/Result");

  exports.getActiveExams = async (req, res) => {
    const { id } = req.params;
    // return console.log(id);
    
    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Institute ID.' });
    }
  
    try {
      const exams = await Exam.find({ institute: id ,isActive:'active'});
  
      if (!exams.length) {
        return res.status(404).json({ message: 'No exams found for this institute.' });
      }
  
      res.status(200).json(exams);
    } catch (error) {
      console.error("Error retrieving exams:", error);
      res.status(500).json({ error: 'Server error' });
    }
  };


  exports.getExam = async (req, res) => {
    const { examId } = req.params;
    const {institute}=req.body;

 
    
    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(institute)) {
      return res.status(400).json({ message: 'Invalid Institute ID.' });
    }
  
    try {
      const exams = await Exam.find({ institute: institute ,_id:examId});
  
      if (!exams.length) {
        return res.status(404).json({ message: 'No exams found for this institute.' });
      }
  
      res.status(200).json(exams);
    } catch (error) {
      console.error("Error retrieving exams:", error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  



exports.submitExam = async (req, res) => {
  const { examId, studentId, score } = req.body;

  // return console.log(examId,studentId,score);
  

  try {
    // Find the exam
    const exam = await Exam.findById(examId);

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    // Check if the student has already completed the exam
    if (exam.completedStudents.includes(studentId)) {
      return res.status(400).json({ message: 'Student has already completed this exam' });
    }

    // Add studentId to the completedStudents array
    exam.completedStudents.push(studentId);

    // Save the result (assuming you have a Result model)
    const result = new Result({
      exam: examId,
      student: studentId,
      score,
      passed: score >= exam.passMark, // Determine pass/fail
    });

    await result.save();

    // Save the updated exam
    await exam.save();

    res.status(200).json({ message: 'Exam submitted successfully', result });
  } catch (error) {
    console.error('Error submitting exam:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
  
  

