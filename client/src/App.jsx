import { Route, Routes } from "react-router-dom";
import InstituteLogin from "./pages/Auth/InstituteLogin";
import InstituteSignup from "./pages/Auth/InstituteSignup";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setError, setLoading, setUser } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import api from "./utils/axios";
import InstituteLayout from "./pages/InstituteLayout";
import SubjectPage from "./pages/Subjects/SubjectPage";
import Loading from "./components/Loading/Loading";
import AddQuestionPage from "./pages/AddQuestion/AddQuestion";
import CreateTest from "./pages/Subjects/CreateTest";
import ShowExamList from "./components/ShowExamList/ShowExamList";
import Student from "./pages/Student/Student";

function App() {
  const dispatch = useDispatch();

  const userId = localStorage.getItem("user_id");
  const isLoading = useSelector((state) => state.user.isLoading);
  const error = useSelector((state) => state.user.error);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!userId) {
      dispatch(setLoading(false));
      return;
    }

    const fetchUserDetails = async () => {
      dispatch(setLoading(true));
      try {

        const response = await api.get(`/user/${userId}`);

        dispatch(setUser(response.data));
      } catch (err) {
        dispatch(setError(err.toString()));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUserDetails();
  }, []);


  if (isLoading) {
    return (
      <Loading/>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <Toaster />
      <Routes>
        {user ? (
          user.role === "institute" ? (
            <Route element={<InstituteLayout />}>
              <Route path="/" element={<div>institute</div>} />
              <Route path="/subjects" element={<SubjectPage/>} />
              <Route path="/subjects/:id" element={<ShowExamList/>} />
              <Route path="/subjects/:id/create-test" element={<CreateTest/>} />
              <Route path="/students" element={<Student/>} />
            </Route>
          ) : user.role === "student" ? (
            <Route path="/" element={<div>student</div>} />
          ) : null
        ) : (
          <>
            <Route path="/institute-login" element={<InstituteLogin />} />
            <Route path="/institute-signup" element={<InstituteSignup />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
