import React, { useEffect, useState } from "react";
import api from "../../utils/axios";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newClass, setNewClass] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userId = localStorage.getItem("user_id");
        const response = await api.get("/classes");

        if (response) {
          setClasses(response.data);
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

  const handleAddClass = async (e) => {
    e.preventDefault();
    try {
      if (newClass.trim()) {
        const response = await api.post("/classes/create-class", {
          name: newClass,
        });
        if (response) {
          setClasses((prevSubjects) => [...prevSubjects, response.data]);

          setNewClass("");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Classes</h1>

      <form onSubmit={handleAddClass} className="mb-6 flex gap-2">
        <input
          type="text"
          value={newClass}
          onChange={(e) => setNewClass(e.target.value)}
          placeholder="Enter Class name"
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add Classes
        </button>
      </form>

      {classes.length === 0 ? (
        <h1>No Classes to display... Create one now</h1>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((cls, index) => (
            <div
              key={index}
              onClick={() => {

                navigate(`/subjects/${cls._id}`);
              }}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <h2 className="text-xl font-semibold">Class name:{cls.name}</h2>
            </div>
          ))}
        </div>
      )}

     
    </div>
  );
};

export default Classes;
