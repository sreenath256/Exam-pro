import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../utils/axios";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setUser } from "../../redux/userSlice";
import toast from "react-hot-toast";

const InstituteLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(4).max(10).required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await api.post("auth/login", data);
      
      if (res) {
        
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.user._id);
        if(res.data.user.institute){
          
          localStorage.setItem("institute", res.data.user.institute);
        }
        // dispatch(setUser(res.data.institute));
        toast.success("Logged in");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-800">
        <h1 className="text-2xl font-bold mb-6">Institute and Student Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-medium mb-2 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-md bg-gray-700 border-gray-600 text-gray-300 focus:bg-gray-600 focus:border-gray-500"
              placeholder="Enter your email"
              {...register("email")}
            />
            <p className="w-full h-5 text-sm text-red-500 pt-2">
              {errors.email?.message}
            </p>
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block font-medium mb-2 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-md bg-gray-700 border-gray-600 text-gray-300 focus:bg-gray-600 focus:border-gray-500"
              placeholder="Enter your password"
              {...register("password")}
            />
            <p className="w-full h-5 text-sm text-red-500 pt-2">
              {errors.password?.message}
            </p>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium rounded-md bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link to="/institute-signup" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default InstituteLogin;