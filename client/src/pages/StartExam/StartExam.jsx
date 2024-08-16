import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import toast from "react-hot-toast";
import ExamWithFile from "./ExamWithFile";

const StarExam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [examData, setExamData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [examFinished, setExamFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(0);

  const [questions, setQuestions] = useState();
  const [isAttended, setIsAttended] = useState();

  const [flag, setFlag] = useState(0);
  useEffect(() => {
    fetchExamData();
  }, [examId]);

  const fetchExamData = async () => {
    try {
      setIsLoading(true);
      const institute = localStorage.getItem("institute");

      const response = await api.post(`/exam/${examId}/student`, { institute });
      setQuestions(shuffleArray(response.data[0].questions));

      setExamData(response.data);

    } catch (error) {
      console.error("Error fetching exam data:", error);
      toast.error("Failed to load exam data");
      navigate("/active-exams");
    } finally {
      setIsLoading(false);
    }
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleOptionSelect = (questionId, selectedOption) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: selectedOption,
    });

    if (currentQuestionIndex < examData[0].displayQuestionNumber - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (flag == 0) {
        setFlag(1);
      }
      if (flag == 1) finishExam();
    }
  };

  const finishExam = async () => {
    let totalScore = 0;
    examData[0].questions.forEach((question) => {
      if (selectedAnswers[question._id] === question.correctAnswer) {
        totalScore += examData[0].markForEach;
        setScore(totalScore);
      }
    });
    setExamFinished(true);


    try {
      let passed=0;
      if (score >= examData[0].passMark) {
         passed = true;
      }else{
       passed = false;
      }

      const response = await api.post("/exam/submit-exam", {
        examId: examData[0]._id,
        studentId: localStorage.getItem("user_id"),
        score: totalScore,
        passed,
        cls:localStorage.getItem('class_id')
      });

    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <div className="text-center text-black">Loading exam...</div>;
  }

  if (!examData) {
    return (
      <div className="text-center text-black">No exam data available.</div>
    );
  }

  if (examData[0].examType === "fileUpload") {
    return (
      <ExamWithFile
        examData={examData}
        setScore={setScore}
        setExamFinished={setExamFinished}
      />
    );
  }

  if (examFinished) {
    const passed = score >= examData[0].passMark;
    return (
      <div className="container mx-auto p-4 text-center text-black">
        <h2 className="text-2xl font-bold mb-4">Exam Completed</h2>
        <p className="text-xl mb-2">Your Score: {score}</p>
        <p className="text-lg mb-4">
          {passed
            ? "Congratulations! You passed."
            : "Sorry, you didn't pass this time."}
        </p>
        <p className="mb-4">Pass Mark: {examData[0].passMark}</p>
        <button
          onClick={() => navigate("/active")}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Exams
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (examData[0].examType === "manually") {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          {examData.examName}
        </h1>

        {flag === 1 ? (
          <div>
            <h1>Exam finished Click submit to proceed</h1>
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleOptionSelect("", "")}
            >
              Submit
            </button>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Question {currentQuestionIndex + 1} of{" "}
              {examData[0].displayQuestionNumber}
            </h2>
            <p className="text-white mb-4">{currentQuestion.question}</p>
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleOptionSelect(currentQuestion._id, option)
                  }
                  className="w-full text-left p-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  return <div>Exam currently not avalable</div>;
};

export default StarExam;
