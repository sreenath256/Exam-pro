import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShowResultForFileExam = ({ score, passMark, passed }) => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto p-4 text-center text-black">
      <h2 className="text-2xl font-bold mb-4">Exam Completed</h2>
      <p className="text-xl mb-2">Your Score: {score}</p>
      <p className="text-lg mb-4">
        {passed
          ? "Congratulations! You passed."
          : "Sorry, you didn't pass this time."}
      </p>
      <p className="mb-4">Pass Mark:{passMark}</p>
      <button
        onClick={() => navigate("/active")}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Back to Exams
      </button>
    </div>
  );
};

export default ShowResultForFileExam;
