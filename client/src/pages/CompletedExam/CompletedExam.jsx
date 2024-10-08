import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/axios";
import toast from "react-hot-toast";

const CompletedExam = () => {
  const [activeExams, setActiveExams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchActiveExams();
  }, []);

  const fetchActiveExams = async () => {
    try {
      setIsLoading(true);
      const institute = localStorage.getItem("institute");
      const classId = localStorage.getItem("class_id");

      const response = await api.get(`/exam/getCompletedExams/${institute}/${classId}`);

      setActiveExams(response.data);
    } catch (error) {
      console.error("Error fetching completed exams:", error);
      toast.error("Failed to load completed exams");
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-blacks">
       Completed exams
      </h1>
      {isLoading ? (
        <p className="text-center text-black">Loading complted exams...</p>
      ) : activeExams.length===0 ? (
        <p className="text-center text-black">
          No complted exams available at the moment.
        </p>
      ) : (
        <ul className="space-y-4">
          {activeExams.map((exam) => {
            return (
              <li
                key={exam._id}
                className="bg-gray-300 rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-black">
                    {exam.examName}
                  </h2>
                  <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full mt-2">
                    Active
                  </span>
                  <span className="pl-3">
                    No Questions :{exam.displayQuestionNumber}
                  </span>
                </div>
                <Link
                  to={`/result/${exam._id}`}
                  className="bg-gray-600 hover:bg-gray-700  text-white font-bold py-2 px-4 rounded"
                >
                  Go to result
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CompletedExam;
