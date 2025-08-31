import { useState, useEffect } from "react";
import '../Home.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import { getBaseURL } from "../../apiConfig";

export default function Home() {
    const [students, setStudents] = useState(0);
    const [lec, setLec] = useState(0);
    const [courses, setCourses] = useState(0);
    const [beststudents, setBestStudents] = useState([]);


    const fetchCountData = async (e) => {
      try{
const stures= await axios.get(getBaseURL() + "api/students/count/student_id");
        setStudents(stures.data.seq);

        const lecs= await axios.get(getBaseURL() + "api/students/count/lecture_id");
        setLec(lecs.data.seq);

        const coursesc= await axios.get(getBaseURL() + "api/students/count/course_id");
        setCourses(coursesc.data.seq);
      }catch (err) {
      alert(err.response?.data?.message || ' failed');
    }
  

};

const fetchBestStudentsData = () => {
  axios.get(getBaseURL() + "api/stuassignments/getbeststudent")
        .then((response) => {
        setBestStudents(response.data);
        console.log(response.data)
    })
    .catch((error) => console.error("Error fetching lecture data:", error));
};

useEffect(() => {
   // Initial load
  fetchCountData();
  fetchBestStudentsData();
}, []);

   const tiles = [
    { title: "Course - "+ courses, color: "bg-blue-200", link: "/admincourses" },
    { title: "Lecturers - "+ lec, color: "bg-green-200", link: "/lecturerlist" },
    { title: "Students - "+ students, color: "bg-purple-200", link: "/studentslist" },
    { title: "Time Table", color: "bg-pink-200", link: "/timetable" },
  ];


  return (
    <div>
<section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      </section>
     <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
      {tiles.map((tile, index) => (
        <Link
          to={tile.link}
          key={index}
          className={`${tile.color} text-green rounded-2xl shadow-lg p-8 flex items-center justify-center text-xl font-semibold hover:opacity-90 transition`}
        >
          {tile.title}
        </Link>
      ))}
    </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      
       <div
          className="bg-blue-200 text-green rounded-2xl shadow-lg p-8 "
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Best Students</h2>

          <div className="tm-3"> <table className="table w-full">
            <tr><th>Student </th><th className="text-right">Total Marks</th></tr>
          {beststudents.length > 0 ? (
                beststudents.map((row) => (
                 
            <tr><td >{row._id}</td>
            <td className="text-right">{row.totalMarks}</td>
              </tr>
                ))
              ) : (
                
                <tr >No Students data available</tr>
              )}
              </table></div>
        </div>
        </div>
    </div>
  );
}
