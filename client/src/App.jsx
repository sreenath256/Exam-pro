import { Route, Routes, useNavigate } from "react-router-dom";
import InstituteLogin from "./pages/Auth/InstituteLogin";
import InstituteSignup from "./pages/Auth/InstituteSignup";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { clearUser, setError, setLoading, setUser } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import api from "./utils/axios";
import InstituteLayout from "./pages/InstituteLayout";
import SubjectPage from "./pages/Subjects/SubjectPage";
import Loading from "./components/Loading/Loading";
import AddQuestionPage from "./pages/AddQuestion/AddQuestion";
import CreateTest from "./pages/Subjects/CreateTest";
import ShowExamList from "./components/ShowExamList/ShowExamList";
import Student from "./pages/Student/Student";
import StudentLayout from "./pages/StudentLayout";
import ActiveExam from "./pages/ActiveExam/ActiveExam";
import StarExam from "./pages/StartExam/StartExam";
import ShowResult from "./pages/ShowResult/ShowResult";
import CompletedExam from "./pages/CompletedExam/CompletedExam";
import StudentMarkList from "./pages/ShowResult/StudentMarkList";

function App() {
  const dispatch = useDispatch();

  const userId = localStorage.getItem("user_id");
  const isLoading = useSelector((state) => state.user.isLoading);
  const error = useSelector((state) => state.user.error);
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      dispatch(setLoading(false));
      dispatch(clearUser());
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
    return <Loading />;
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
              <Route path="/subjects" element={<SubjectPage />} />
              <Route path="/subjects/:id" element={<ShowExamList />} />
              <Route path="/subjects/:id/create-test" element={<CreateTest />} />
              <Route path="/students" element={<Student />} />
              <Route path="/:examId/result" element={<StudentMarkList />} />
              <Route path="*" element={navigate('/')} />
              {/* <Route path="*" element={navigate("/")} /> */}
            </Route>
          ) : user.role === "student" ? (
            <Route element={<StudentLayout />}>
              <Route path="/" element={<div>From student div</div>} />
              <Route path="/active" element={<ActiveExam />} />
              <Route path="/completed" element={<CompletedExam />} />
              <Route path="/subjects" element={<SubjectPage />} />
              <Route path="/start-exam/:examId" element={<StarExam />} />
              <Route path="/result/:examId" element={<ShowResult />} />
              <Route path="*" element={navigate('/')} />
              {/* <Route path="/" element={navigate("/active")} /> */}
            </Route>
          ) : null
        ) : (
          <>
            <Route path="/institute-login" element={<InstituteLogin />} />
            <Route path="/institute-signup" element={<InstituteSignup />} />
              <Route path="/student-login" element={<InstituteLogin />} />
              <Route path="*" element={navigate('/institute-login')} />
            {/* <Route path="*" element={navigate("/institute-login")} /> */}
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
