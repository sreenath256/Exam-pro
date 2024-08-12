import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddQuestionPage from "../AddQuestion/AddQuestion";
import toast from "react-hot-toast";
import api from "../../utils/axios";
import PdfUpload from "../AddQuestion/PdfUpload";

const CreateTest = () => {
  const { id: subjectId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [file, setFile] = useState();
  const [answers, setAnswers] = useState();
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  const [addPdf, setAddPdf] = useState(false);
  const [isFileUpload, setIsFileUpload] = useState(false);
  const [formData, setFormData] = useState({
    examQuestionsNumber: "",
    marksPerQuestion: 1,
    passMark: 50,
    examName: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (addPdf && file) {
        console.log(file);
        console.log(answers);
        const object1 = {
          'file':file,
          examType:'fileUpload',
          subjectId,
          isActive: "pending",
        };
        const combinedData = {
          ...formData,
          ...object1,
        };

        const response = await api.post("/exam/create-exam-with-file", combinedData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response) {
          console.log(response);
          navigate(`/subjects/${subjectId}`);
        }

        
      } else {
        if (questions.length === 0) {
          return toast.error("Please add questions");
        }
        const object1 = {
          examType:'manually',
          questions: questions,
          subjectId,
          isActive: "pending",
        };
        const combinedData = {
          ...formData,
          ...object1,
        };
        console.log(combinedData);
        

        const response = await api.post("/exam/create-exam", combinedData);
        if (response) {
          console.log(response);
          navigate(`/subjects/${subjectId}`);
        }
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const handleAddQuestion = () => {
    setIsQuestionOpen(true);
  };

  const hanldeFileUpload = () => {
    setIsFileUpload(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMethodChange = (e) => {
    const value = e.target.value;
    if (value === "manual") {
      setAddPdf(false);
    }

    if (value === "pdf") {
      setAddPdf(true);
    }
  };

  return (
    <div className="p-4 w-full">
      <h1 className="text-3xl font-bold mb-6"></h1>
      {isQuestionOpen ? (
        <AddQuestionPage
          setIsQuestionOpen={setIsQuestionOpen}
          setQuestions={setQuestions}
        />
      ) : isFileUpload ? (
        <PdfUpload setAnswers={setAnswers} setFile={setFile}  setIsFileUpload={setIsFileUpload}/>
      ) : (
        <>
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Exam Information</h2>
            <p>
              Status: <span className="font-medium">{formData.examStatus}</span>
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
              <div>
                <label className="block mb-1 font-semibold">
                  Select Method to Add Questions
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  onChange={handleMethodChange}
                >
                  <option value="manual">Manually</option>
                  <option value="pdf">Upload PDF</option>
                </select>
              </div>

              {addPdf ? (
                <button
                  type="button"
                  onClick={hanldeFileUpload}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Upload PDF
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
                  disabled={isFileUpload}
                >
                  Add Question
                </button>
              )}
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
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Save Exam
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateTest;
