import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../utils/axios";

const ShowExamList = ({ subjectName }) => {
  const [refresh, setRefresh] = useState(false);

  const { id: subjectId } = useParams();

  // Mock data for exams - in a real app, this would come from your backend or state management
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/exam/${subjectId}`);

      if (response) {
        setExams(response.data);
      }
      console.log(response);
    };

    fetchData();
  }, [refresh]);

  const handleStartExam = async (id) => {
    try {
      const response = await api.post(`/exam/${id}/start`);
      setRefresh(!refresh)
    } catch (err) {
      console.log(err);
    }
  };

  const handleStopExam = async (id)=>{
    try {
        const response = await api.post(`/exam/${id}/stop`);
        setRefresh(!refresh)
    } catch (err) {
        console.log(err);
      }
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">{subjectName}</h1>

      <Link to="create-test">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Create exam
        </button>
      </Link>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Exams</h2>

        {exams.length > 0 ? (
          <ul className="space-y-2">
            {exams.map((exam) => (
              <li
                key={exam._id}
                className="flex justify-between items-center bg-gray-100 p-3 rounded"
              >
                <span>Exam {exam.examName}</span>
                {exam.isActive === "pending" ? (
                  <span
                    onClick={() => handleStartExam(exam._id)}
                    className="px-2 cursor-pointer py-1 rounded text-sm font-bold bg-green-200 text-green-800"
                  >
                    Start
                  </span>
                ) : exam.isActive === "active" ? (
                  <span
                    onClick={() => handleStopExam(exam._id)}
                    className="px-2 py-1 cursor-pointer rounded text-sm font-bold bg-red-200 text-red-800"
                  >
                    Stop
                  </span>
                ) : null}
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    exam.isActive === "completed"
                      ? "bg-green-200 text-green-800"
                      : exam.isActive === "active"
                      ? "bg-yellow-200 text-yellow-800"
                      : exam.isActive === "pending"
                      ? "bg-gray-400 text-gray-900"
                      : ""
                  }`}
                >
                  {exam.isActive.charAt(0).toUpperCase() +
                    exam.isActive.slice(1)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No exams created yet.</p>
        )}
      </div>
    </div>
  );
};

export default ShowExamList;
