import React, { useEffect, useState } from "react";
import api from "../../utils/axios";
import ShowResultForFileExam from "../ShowResult/ShowResultForFileExam";

const ExamWithFile = ({ examData, setScore, setExamFinished }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [questionCount, setQuestionCount] = useState(3);
  const [correctAnswer, setCorrectAnswer] = useState(3);
  const [showResult, setShowResult] = useState(false);
  const [mark, setMark] = useState();
  const [passed, setPassed] = useState();

  useEffect(() => {
    setPdfFile("http://localhost:3000" + examData[0].questionFilePath);
    setQuestionCount(examData[0].questionsCount);
    setCorrectAnswer(examData[0].answers);
  }, []);

  const handleOptionChange = (questionIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[questionIndex] = option;
    setSelectedOptions(updatedOptions);
  };

  const handleSubmit = async () => {
    if (
      selectedOptions.length !== questionCount ||
      selectedOptions.includes(undefined)
    ) {
      alert("Please select an option for all questions before submitting.");
      return;
    }


    let mark = 0;
    for (let i = 0; i < questionCount; i++) {

      if (correctAnswer[i] == selectedOptions[i]) {
        setScore((prevState) => (prevState += examData[0].markForEach));
        mark += examData[0].markForEach;
      }
      setMark(mark);
    }
    try {
      setExamFinished(true);
      if (mark >= examData[0].passMark) {
        setPassed(true);
      } else {
        setPassed(false);
      }

      const response = await api.post("/exam/submit-exam", {
        examId: examData[0]._id,
        studentId: localStorage.getItem("user_id"),
        score: mark,
        passed,
        cls:localStorage.getItem('class_id')
      });
      setShowResult(true);
    } catch (err) {
      console.log(err);
    }
  };

  if (showResult) {
    return (
      <ShowResultForFileExam
        score={mark}
        passMark={examData[0].passMark}
        passed={passed}
      />
    );
  }

  return (
    <div className="w-full p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-end mb-4"></div>
      <div className="flex space-x-4">
        <div className="w-1/2 bg-white p-4 rounded shadow">
          {pdfFile && (
            <embed
              src={pdfFile}
              type="application/pdf"
              width="100%"
              height="600px"
            />
          )}
        </div>
        <div className="w-1/2 bg-white p-4 rounded shadow overflow-scroll max-h-screen">
          <form>
            {Array.from({ length: questionCount }).map((_, index) => (
              <div key={index} className="mb-6">
                <p className="font-bold mb-2">Question {index + 1}</p>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        onChange={() => handleOptionChange(index, option)}
                        className="form-radio"
                      />
                      <span>Option {option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </form>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamWithFile;
