import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddQuestionPage from "../AddQuestion/AddQuestion";
import toast from "react-hot-toast";
import api from "../../utils/axios";

const CreateTest = ({}) => {
  const { id: subjectId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  const [formData, setFormData] = useState({
    examQuestionsNumber: "",
    marksPerQuestion: 1,
    passMark: 50,
    examName: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (questions.length === 0) {
        return toast.success("Please add questions");
      }
      const object1 = {
        questions: questions,
        subjectId,
        isActive: "pending",
      };
      const combinedData = {
        ...formData,
        ...object1,
      };
      // return console.log(combinedData);
      
      const response = await api.post("/exam/create-exam", combinedData);
      if (response) {
        console.log(response);
        navigate(`/subjects/${subjectId}`);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const handleAddQuestion = () => {
    setIsQuestionOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log("Questions", questions);

  return (
    <>
      <div className="container mx-auto p-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6"></h1>
        {isQuestionOpen ? (
          <AddQuestionPage
            setIsQuestionOpen={setIsQuestionOpen}
            setQuestions={setQuestions}
          />
        ) : (
          <>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Exam Information</h2>
              <p>
                Status:{" "}
                <span className="font-medium">{formData.examStatus}</span>
              </p>
              <p>
                Total Questions:{" "}
                <span className="font-medium">{formData.questionCount}</span>
              </p>
              <p>
                Marks per Question:{" "}
                <span className="font-medium">{formData.marksPerQuestion}</span>
              </p>
              <p>
                Pass Mark:{" "}
                <span className="font-medium">{formData.passMark}%</span>
              </p>
            </div>

            <form onSubmit={onSubmit}>
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Add Question
                </button>
                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Save Exam
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block mb-1 font-semibold">Exam name</label>
                  <input
                    type="text"
                    name="examName"
                    value={formData.examName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">
                    Marks per Question:
                  </label>
                  <input
                    type="number"
                    name="marksPerQuestion"
                    value={formData.marksPerQuestion}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold">
                    No. of Questions for Exam
                  </label>
                  <input
                    type="number"
                    name="examQuestionsNumber"
                    value={formData.examQuestionsNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    min="0"
                    max="100"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Pass Mark</label>
                  <input
                    type="number"
                    name="passMark"
                    value={formData.passMark}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    min="0"
                    max="100"
                    required
                  />
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default CreateTest;
