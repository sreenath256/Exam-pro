import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import {useDispatch} from 'react-redux'
import { clearUser } from '../../redux/userSlice'

const Topbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/')
  };

  return (
    <header className="w-full flex justify-between bg-white shadow-md p-4">
      <h1 className="text-lg font-semibold">Exam pro</h1>
      <button
        onClick={handleLogout}
        className="ml-4 p-2 rounded-full text-gray-800  hover:bg-gray-200  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors duration-200"
      >
        <FaSignOutAlt />
      </button>
    </header>
  );
};

export default Topbar;
