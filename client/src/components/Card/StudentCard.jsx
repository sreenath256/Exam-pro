import React from 'react';
import { FaUserCircle, FaEnvelope, FaGraduationCap } from 'react-icons/fa';


const StudentCard = ({student}) => {
    
  return (
    
      <li 
        
        className="bg-white shadow-md rounded-lg p-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
      >
        <div className="flex items-center mb-4">
          <FaUserCircle className="w-12 h-12 text-blue-500 mr-4" />
          <h3 className="text-xl font-semibold text-gray-800">{student.name}</h3>
        </div>
        <div className="space-y-2">
          <p className="flex items-center text-gray-600">
            <FaEnvelope className="w-5 h-5 mr-2 text-gray-400" />
            {student.email}
          </p>
          <p className="flex items-center text-gray-600">
            <FaGraduationCap className="w-5 h-5 mr-2 text-gray-400" />
            {student.class ? student.class.name : "Not specified"}
          </p>
        </div>
      </li>
   
  );
};

export default StudentCard;