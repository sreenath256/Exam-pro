import React from "react";
import { Link } from "react-router-dom";

const LeftSidebarForStudent = () => {
  return (
    <div className="w- h-screen bg-gray-800 text-white p-4">
      <nav >
        <ul className="space-y-6 text-lg">
          
          <li className="mb-2">
            <Link to="/active" className="hover:text-gray-300">
            Active exam
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/completed" className="hover:text-gray-300">
              Completed exam
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LeftSidebarForStudent;
