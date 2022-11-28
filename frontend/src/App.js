import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import AllCoursesPage from "./pages/AllCourses";
import NewCoursePage from "./pages/NewCourse";
import FavoritesPage from "./pages/Favorites";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Logout from "./pages/logout";
import SingleCoursePage from "./pages/SingleCoursePage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllCoursesPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/new-course" element={<NewCoursePage />}></Route>
        <Route path="/favorites" element={<FavoritesPage />}></Route>
        {/* <Route path="/myCourses" element={<MyCourses />}></Route> */}
        <Route path="/courses/:courseId" element={<SingleCoursePage />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
