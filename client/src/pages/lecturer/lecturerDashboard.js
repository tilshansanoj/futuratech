import { useState, useEffect } from "react";
import '../Home.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import { getBaseURL } from "../../apiConfig";

export default function Home() {
  const [coursesData, setCoursesData] = useState([]);
    const [students, setStudents] = useState([]);
    const [lec, setLec] = useState(0);
    const [courses, setCourses] = useState(0);

const fetchCoursesData = () => {
  axios.get(getBaseURL() + "api/courses/course_bylec/"+sessionStorage.getItem("name"))
        .then((response) => {
        setCoursesData(response.data);
        console.log(response.data)
    })
    .catch((error) => console.error("Error fetching lecture data:", error));
};

const fetchStudentsData = () => {
  axios.get(getBaseURL() + "api/stuassignments/getbeststudent")
        .then((response) => {
        setStudents(response.data);
        console.log(response.data)
    })
    .catch((error) => console.error("Error fetching lecture data:", error));
};
   

useEffect(() => {
   // Initial load
  fetchCoursesData();
  fetchStudentsData();
}, []);

  


  return (
    <div>
<section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      </section>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      
       <div
          className="bg-blue-200 text-green rounded-2xl shadow-lg p-8 "
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Best Students</h2>

          <div className="tm-3"> <table className="table w-full">
            <tr><th>Student </th><th className="text-right">Total Marks</th></tr>
          {students.length > 0 ? (
                students.map((row) => (
                 
            <tr><td >{row._id}</td>
            <td className="text-right">{row.totalMarks}</td>
              </tr>
                ))
              ) : (
                
               <tr >No Students data available</tr>
              )}
              </table></div>
        </div>
        <div
          className="bg-green-200 text-green rounded-2xl shadow-lg p-8 "
        >
          <h2 className="text-2xl font-bold mb-4 text-center">My Courses</h2>
         
         <div className="tm-3"> <ul>
          {coursesData.length > 0 ? (
                coursesData.map((row) => (
                 
            <li>{row.course_id} {row.name} </li>
                ))
              ) : (
                
                <li >No Course data available</li>
              )}
              </ul></div>
        </div>
    </div>
    
    </div>
  );
}
