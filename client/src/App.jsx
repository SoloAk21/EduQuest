import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/student/Home";
import MyEnrollement from "./pages/student/MyEnrollement";
import CourseList from "./pages/student/CourseList";
import CourseDeatils from "./pages/student/CourseDeatils";
import Player from "./pages/student/Player";
import Loading from "./components/student/Loading";
import AddCourse from "./pages/educator/AddCourse";
import Educator from "./pages/educator/Educator";
import MyCourses from "./pages/educator/MyCourses";
import StudentEnrolled from "./pages/educator/StudentEnrolled";
import NavBar from "./components/educator/NavBar";
import Footer from "./components/educator/Footer";
import Dashboard from "./pages/educator/Dashboard";

function AppRoutes() {
  return (
    <Router>
      <NavBar /> {/* Common Navbar for all pages */}
      <Routes>
        {/* Student Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/my-enrollment" element={<MyEnrollement />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/course-details/:id" element={<CourseDeatils />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />

        {/* Educator Routes */}
        <Route path="/educator" element={<Educator />}>
          <Route index element={<Dashboard />} />{" "}
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="students-enrolled" element={<StudentEnrolled />} />
        </Route>
      </Routes>
      <Footer /> {/* Common Footer for all pages */}
    </Router>
  );
}

export default AppRoutes;
