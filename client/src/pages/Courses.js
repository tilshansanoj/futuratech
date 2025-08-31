import React, { useState , useEffect  } from 'react';
import axios from 'axios';
import { getBaseURL } from "../apiConfig";
import './Home.css';
import cover from '../assets/cover2.png';

export default function Home() {
  const [coursesData, setCoursesData] = useState([]);

   const fetchCoursesData = () => {
  axios.get(getBaseURL() + "api/courses/details")
        .then((response) => {
        setCoursesData(response.data);
        console.log(response.data)
    })
    .catch((error) => console.error("Error fetching course data:", error));
};
useEffect(() => {
  fetchCoursesData(); // Initial load
}, []);

const openDetails = (course) => {
    //props.handleOrderDetails(order);
    window.location.href='/registrationForm/'+course;
  };
  return (
    <div>
<img src={cover} alt="FuturaTech Cover" className="w-full" />
<section className="text-center">
        <h2 className="text-4xl font-bold mb-4">Our Courses</h2>
      </section>
      <section id="contact" className="max-w-4xl mx-auto">
        <h3 className="text-3xl font-semibold mb-4">Courses List</h3>

        <ul className="text-gray-700 text-lg space-y-2">
  
{coursesData.length > 0 ? (
                coursesData.map((row) => (
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
      </section>

    </div>
  );
}
