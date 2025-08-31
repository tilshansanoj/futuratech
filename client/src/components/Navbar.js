import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import logo from '../assets/logo.png';
import admin from '../assets/admin.png';
import student from '../assets/student.png';
import lecture from '../assets/lecture.png';

export default function Navbar() {

  const [isLogin, setIsLogin] = useState(false);
  const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const userloging = sessionStorage.getItem("isLogin");
        setIsLogin(userloging);

        const usertype = sessionStorage.getItem("userRole");
        setUserRole(usertype);
    
      }, []);

  const logout = () => {
    sessionStorage.removeItem("isLogin"); // remove login status
    sessionStorage.removeItem("userRole"); // remove any extra data
    // or clear all sessionStorage:
    // sessionStorage.clear();

    window.location.href='/'; // redirect to login page
  };
 
    if (isLogin === "true" && userRole === "Admin") {
    return (
      <nav className="p-4 bg-blue-600 text-white flex justify-between items-center">
      <div className="flex items-center space-x-3">
         <img src={logo} alt="FuturaTech Logo" className="h-14 w-14 rounded-full" />
     
      </div>
      <div className="space-x-8 a-large">
        <Link to="/adminDashboard">Admin Dashboard</Link>
        <Link to="/admincourses">Coursers</Link>
        <Link to="/lecturerlist">Lecturer</Link>
        <Link to="/studentslist">Students</Link>
        <Link to="/timetable">Time Table</Link>
        <Link onClick={logout}>Logout</Link>
        
      </div>
      <div className="">
         <img src={admin} alt="FuturaTech Logo" className="h-14 w-14 rounded-full" />
         Admin
      </div>
      </nav>
    );
  } else if (isLogin === "true" && userRole === "Student") {
    
    return (
      <nav className="p-4 bg-blue-600 text-white flex justify-between items-center">
      <div className="flex items-center space-x-3">
         <img src={logo} alt="FuturaTech Logo" className="h-14 w-14 rounded-full" />
     
      </div>
      <div className="space-x-8 a-large">
         <Link to="/studentDashboard">Student Dashboard</Link>
        <Link to="/studentassignments">My Assignments</Link>
        <Link to="/studentscourse">Course materials</Link>
        <Link to="/studentsresults">My Results</Link>
        <Link to="/timetable">Time Table</Link>
        <Link onClick={logout}>Logout</Link>
       
      </div>
      <div className="">
         <Link to="/profile"><img src={student} alt="FuturaTech Logo" className="h-14 w-14 rounded-full" />
         {sessionStorage.getItem("name")}
          </Link>
      </div>
      </nav>
    );
  }
  else if (isLogin === "true" && userRole === "Lecturer") {
    
    return (
      <nav className="p-4 bg-blue-600 text-white flex justify-between items-center">
      <div className="flex items-center space-x-3">
         <img src={logo} alt="FuturaTech Logo" className="h-14 w-14 rounded-full" />
     
      </div>
      <div className="space-x-8 a-large">
         <Link to="/lecturerDashboard">Lecturer Dashboard</Link>
        <Link to="/lecturerasignments">Assignments</Link>
        <Link to="/lecturercourses">Course materials</Link>
        <Link to="/lecturerresults">Student Submission</Link>
        <Link to="/timetable">Time Table</Link>
        <Link onClick={logout}>Logout</Link>
       
      </div>
      <div className="">
         <Link to="/profile"><img src={lecture} alt="FuturaTech Logo" className="h-14 w-14 rounded-full" />
          {sessionStorage.getItem("name")}
          </Link>
      </div>
      </nav>
    );
  }
   else {
    return (
      <nav className="p-4 bg-blue-600 text-white flex justify-between items-center">
      <div className="flex items-center space-x-3">
         <img src={logo} alt="FuturaTech Logo" className="h-14 w-14 rounded-full" />
     <h1 className="text-xl font-bold">FuturaTech University</h1>
      </div>
      <div className="space-x-8 a-large">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/login">Login</Link>
        <Link to="/registrationForm">Register Online</Link>
      </div>

      </nav>
    );
  }
}
