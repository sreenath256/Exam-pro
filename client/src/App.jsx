import { Route, Routes } from "react-router-dom";
import InstituteLogin from "./pages/Auth/InstituteLogin";
import InstituteSignup from "./pages/Auth/InstituteSignup";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setError, setLoading, setUser } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import api from "./utils/axios";

function App() {
  const dispatch = useDispatch();

  const userId = localStorage.getItem("user_id");
  const isLoading = useSelector((state) => state.user.isLoading);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    if (!userId) {
      dispatch(setLoading(false));
      return;
    }

    const fetchUserDetails = async () => {
      dispatch(setLoading(true));
      try {
        const response = await api.get(`/users/${userId}`);
        console.log(response);

        dispatch(setUser(response.data));
      } catch (err) {
        dispatch(setError(err.toString()));
      } finally {
        dispatch(setLoading(false));
        console.log("from finally");
      }
    };

    fetchUserDetails();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <AiOutlineLoading3Quarters className="animate-spin text-center text-4xl text-blue-500 dark:text-blue-400" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <Toaster />

      <Routes>
        <Route path="/" element={<div>Hello</div>} />
        <Route path="/institute-login" element={<InstituteLogin />} />
        <Route path="/institute-signup" element={<InstituteSignup />} />
      </Routes>
    </div>
  );
}

export default App;
