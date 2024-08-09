import React, { useEffect, useState } from "react";
import api from "../../utils/axios";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

const SubjectPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newSubject, setNewSubject] = useState("");

const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userId = localStorage.getItem("user_id");
        const response = await api.post("/subject", { id: userId });

        if (response) {
          setSubjects(response.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      if (newSubject.trim()) {
        const response = await api.post("/subject/create-subject", {
          name: newSubject,
        });
        if (response) {
          setSubjects((prevSubjects) => [
            ...prevSubjects,
            response.data,
          ]);

          setNewSubject('')
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Subjects</h1>

      <form onSubmit={handleAddSubject} className="mb-6 flex gap-2">
        <input
          type="text"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="Enter subject name"
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add Subject
        </button>
      </form>

      {subjects.length === 0 ? (
        <h1>No subjects to display... Create one now</h1>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject, index) => (
            <div key={index} onClick={()=>navigate(subject._id)} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold">{subject.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubjectPage;
