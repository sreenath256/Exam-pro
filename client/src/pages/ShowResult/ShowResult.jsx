import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/axios";
import Loading from "../../components/Loading/Loading";

const ShowResult = () => {
  const { examId: id } = useParams();
  const navigate = useNavigate()
  
  const  [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [examName, setExamName] = useState('');
  const [passMark, setPassMark] = useState('');

  const [error,setError]=useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const studentId = localStorage.getItem("user_id");

        const response = await api.post(`/exam/getStudentResult/${id}`, {
          studentId,
        });
        setExamName(response.data.exam.examName)
        setPassMark(response.data.exam.passMark)
        setResult(response.data);

      } catch (err) {
        setError(err.message)
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

const Error = ()=>{

    
    
    <div className="flex items-center justify-between p-4 mb-4 text-white bg-red-600 rounded-lg shadow-md">
      <div className="flex items-center">
        <div className="font-bold mr-2">Error:</div>
        <span>{error.message}</span>
      </div>
      <button
        className="text-white font-bold px-2 py-1 ml-4 bg-red-800 rounded hover:bg-red-700"
        >
        X
      </button>
    </div>
  
}
 

  return (
    <div className="container mx-auto p-4 text-center text-black">
      {isLoading ? (
        <Loading />
      ) : error ?<div>No result found</div>: (
        <>
          <h2 className="text-2xl font-bold mb-4">Exam {examName} </h2>

          <p className="text-xl mb-2">Your Score: {result.score} </p>
          <p className="text-lg mb-4">
            {result.passed
              ? "Congratulations! You passed."
              : "Sorry, you didn't pass this time."}
          </p>
          <p className="mb-4">Pass Mark:{passMark} </p>
          <button
            onClick={() => navigate("/active")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back 
          </button>
        </>
      )}
    </div>
  );
};

export default ShowResult;
