import React, { useState , useEffect  } from 'react';
import axios from 'axios';
import { getBaseURL } from "../../apiConfig";
import '../Home.css';

export default function Home() {
  const [coursesData, setCoursesData] = useState([]);
  const [stucoursesData, setStuCoursesData] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);

   const fetchCoursesData = () => {
  axios.get(getBaseURL() + "api/courses/details")
        .then((response) => {
        setCoursesData(response.data);
        console.log(response.data)
    })
    .catch((error) => console.error("Error fetching course data:", error));
};

const fetchstuCoursesData = () => {
  axios.get(getBaseURL() + "api/students/course_forstu/"+sessionStorage.getItem("name"))
        .then((response) => {
        setStuCoursesData(response.data);
        console.log(response.data)
    })
    .catch((error) => console.error("Error fetching lecture data:", error));
};
useEffect(() => {
  fetchCoursesData(); // Initial load
  fetchstuCoursesData();
}, []);

useEffect(() => {
  if (coursesData.length && stucoursesData.length) {
    const filtered = coursesData.filter(
      course => !stucoursesData.some(sc => sc.course === course.name)
    );
    setAvailableCourses(filtered);
  }
}, [coursesData, stucoursesData]);



const openDetails = (course) => {
  axios
    .get(getBaseURL()+'api/students/course_addstu/'+sessionStorage.getItem("name")+"/"+course)
    .then((response) => {
        console.log(response);
        fetchstuCoursesData();
    })
    .catch((error) => console.error("Error fetching lecture notes:", error));
    
  };

     const deleteCourse = (id) => {
      console.log(id)
    axios
    .delete(getBaseURL()+'api/students/stucourse/'+id)
    .then((res) => {
      console.log("Deletion successful");
      //fetchProductsCat();
      alert('Deletion successful!');

      fetchCoursesData(); // Initial load
  fetchstuCoursesData();

    })
    .catch((err) => console.log("Error"));
  };

  return (
    <div>
<section className="text-center">
        <h2 className="text-4xl font-bold mb-4">Our Courses</h2>
      </section>

      <section id="form" className="grid grid-cols-2 gap-2">
      <div className="w-full bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">My Enrolled  Courses</h2>
        <div className="overflow-x-auto">

        <ul className="text-gray-700 text-lg space-y-2">
  
{stucoursesData.length > 0 ? (
                stucoursesData.map((row) => (
                <li className="flex justify-between items-center border-b pb-1">
    <span> {row.course} </span>
    
         <button 
    className="px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded" 
    onClick={() => deleteCourse(row._id)}
  >
    Leave
  </button>
  </li>
                ))
              ) : (
                
                <span >No Course data available</span>
              )}
  
        </ul>
        </div>
        </div>
        <div className="w-full bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Courses List</h2>
        <div className="overflow-x-auto">

        <ul className="text-gray-700 text-lg space-y-2">
  
{availableCourses.length > 0 ? (
                availableCourses.map((row) => (
                <li className="flex justify-between items-center border-b pb-1">
    <span>{row.course_id} - {row.name} </span>
    
         <button 
    className="px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded" 
    onClick={() => openDetails(row.name)}
  >
    Enroll
  </button>
  </li>
                ))
              ) : (
                
                <span >No Course data available</span>
              )}
  
        </ul>
      </div>
      </div>
</section>
    </div>
  );
}
