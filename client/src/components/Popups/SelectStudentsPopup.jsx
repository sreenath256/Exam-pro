import React, { useEffect, useState } from "react";
import api from "../../utils/axios";

const SelectStudentsPopup = ({ onClose, onSave, classId }) => {
  const [selectedStudents, setSelectedStudents] = useState({});
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/user/getStudentsByClass/${classId}`);
        if (response && response.data) {
          setStudents(response.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [classId]);

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    const newSelectedStudents = {};
    students.forEach((student) => {
      newSelectedStudents[student.id] = isChecked;
    });
    setSelectedStudents(newSelectedStudents);
  };

  const handleStudentSelect = (studentId) => {
    setSelectedStudents((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const handleSave = () => {
    const selectedStudentIds = Object.keys(selectedStudents).filter(
      (id) => selectedStudents[id]
    );
    onSave(selectedStudentIds);
    onClose();
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="bg-white p-5 rounded-lg shadow-xl">
          <p>Loading students...</p>
        </div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="bg-white p-5 rounded-lg shadow-xl">
          <p>No students found for this class.</p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Select Students</h2>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              onChange={handleSelectAll}
              checked={
                students.length > 0 &&
                Object.keys(selectedStudents).length === students.length &&
                Object.values(selectedStudents).every(Boolean)
              }
            />
            <span className="ml-2 text-gray-700">Select All</span>
          </label>
        </div>

        <div className="max-h-60 overflow-y-auto mb-4">
          {students.map((student) => (
            <div key={student._id} className="mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={selectedStudents[student.id] || false}
                  onChange={() => handleStudentSelect(student.id)}
                />
                <span className="ml-2 text-gray-700">{student.name}</span>
              </label>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectStudentsPopup;