import React, { useEffect, useState } from "react";
import api from "../../utils/axios";
import { FaUserCircle, FaEnvelope, FaGraduationCap } from "react-icons/fa";

import { toast } from "react-hot-toast";
import StudentCard from "../../components/Card/StudentCard";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    classId: "",
    institute: localStorage.getItem("user_id"),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instituteId = localStorage.getItem("user_id");

        const response = await api.get(`/user/getAllStudents/${instituteId}`);
        if (response) {
          setStudents(response.data);
        }

        const classResponse = await api.get("/classes");
        if (classResponse) {
          setClasses(classResponse.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddStudent = async (e) => {
    try {
      e.preventDefault();

      const response = await api.post("/user/create-student", formData);

      if (response) {
        toast.success("Student created");
        setStudents([...students, formData]);
        setFormData({ name: "", email: "", password: "", classId: "" });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Listing</h1>
      <form onSubmit={handleAddStudent} className="mb-8">
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <select
            name="classId"
            value={formData.classId}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="" disabled>
              Select Class
            </option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Student
        </button>
      </form>

      <div className="max-w-4xl mx-auto p-2">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Student List</h2>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {students.map((student) => (
            <StudentCard student={student} key={student.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Student;
