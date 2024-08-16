import React from "react";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
  return (
    <div className="w- h-screen bg-gray-800 text-white p-4">
      <nav >
        <ul className="space-y-6 text-lg">
          <li className="mb-2">
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          {/* <li className="mb-2">
            <Link to="/subjects" className="hover:text-gray-300">
            Subjects
            </Link>
          </li> */}
           <li className="mb-2">
            <Link to="/classes" className="hover:text-gray-300">
            Classes
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/students" className="hover:text-gray-300">
              Students
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LeftSidebar;
