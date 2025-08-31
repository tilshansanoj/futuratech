import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import Footer from "./components/Footer";
import RegistrationForm from './pages/RegistrationForm';
import RegAd from './pages/RegisterAd';
import Admin from './pages/Admin';
import Lecturer from './pages/Lecturer';
import TimeTable from './pages/timetable';

import AdminDashboard from './pages/admin/adminDashboard';
import Admincourses from './pages/admin/admincourses';
import Lecturerlist from './pages/admin/lecturerlist';
import Studentslist from './pages/admin/studentslist';
import Lectureredit from './pages/admin/lectureredit';
import Coursesedit from './pages/admin/coursesedit';

import StudentDashboard from './pages/students/studentDashboard';
import Studentassignments from './pages/students/studentassignments';
import Studentscourse from './pages/students/studentscourse';
import Studentsresults from './pages/students/studentsresults';
import Enroll from './pages/students/enroll';


import LecturerDashboard from './pages/lecturer/lecturerDashboard';
import Lecturerasignments from './pages/lecturer/lecturerasignments';
import Lecturercourses from './pages/lecturer/lecturercourses';
import LectureResults from './pages/lecturer/lecturerresults';
import Checkassignments from './pages/lecturer/checkassignments';

function App() {

  

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrationForm" element={<RegistrationForm />} />
        <Route path="/registrationForm/:course" element={<RegistrationForm />} />
         <Route path="/regAd" element={<RegAd />} />
         <Route path="/Admin" element={<Admin />} />
         <Route path="/Lecturer" element={<Lecturer/>} />
         <Route path="/timetable" element={<TimeTable />} />
         <Route path="/logout" element={<Home />} />

         <Route path="/adminDashboard" element={<AdminDashboard />} />
         <Route path="/admincourses" element={<Admincourses />} />
         <Route path="/lecturerlist" element={<Lecturerlist />} />
         <Route path="/studentslist" element={<Studentslist />} />
         <Route path="/lectureredit/:id" element={<Lectureredit />} />
         <Route path="/coursesedit/:id" element={<Coursesedit />} />

         <Route path="/studentDashboard" element={<StudentDashboard />} />
          <Route path="/studentassignments" element={<Studentassignments />} />
          <Route path="/studentscourse" element={<Studentscourse />} />
          <Route path="/studentsresults" element={<Studentsresults />} />
          <Route path="/enroll" element={<Enroll />} />

          <Route path="/lecturerDashboard" element={<LecturerDashboard />} />
         <Route path="/lecturerasignments" element={<Lecturerasignments />} />
         <Route path="/lecturercourses" element={<Lecturercourses />} />
         <Route path="/lecturerresults" element={<LectureResults />} />
         <Route path="/checkassignments/:id" element={<Checkassignments />} />


      </Routes>
      <Footer />
    </Router>
    
  );
}

export default App;

