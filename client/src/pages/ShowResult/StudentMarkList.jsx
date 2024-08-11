import React, { useEffect, useState } from "react";
import api from "../../utils/axios";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const StudentMarkList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [results, setResults] = useState();

  const { examId: examId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const instituteId = localStorage.getItem("user_id");
        const response = await api.post(`/exam/${examId}/result`, {
          institute: instituteId,
        });
        setResults(response.data);
        console.log(response);
      } catch (err) {
        setError(err);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <Loading />
      ) : error ? (
        <div>Error</div>
      ) : results &&(
        <>
          <h1 className="text-2xl font-bold mb-4">Exam Results</h1>
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Mark</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-4 py-2">{result.student.name}</td>
                    <td className="px-4 py-2">{result.student.email}</td>
                    <td className="px-4 py-2">{result.score}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          result.passed
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {result.passed ? "Passed" : "Failed"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentMarkList;
