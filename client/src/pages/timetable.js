import { useState, useEffect } from "react";
import axios from 'axios';
import { getBaseURL } from "../apiConfig";
import './Home.css';

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

 const timeSlots = ["8 AM - 11 AM", "11 AM - 2 PM", "2 PM - 5 PM"];

// helper to pick random slot
const getRandomSlot = () => {
  return timeSlots[Math.floor(Math.random() * timeSlots.length)];
};



  return (
    <div>
<section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Time Table</h2>
      </section>
      
<section id="form" className="grid grid-cols-1 gap-2">
    {/* Right Side: Table */}
    <div className="w-full bg-white p-6 shadow-md rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 border-r">Course Id</th>
                <th className="p-2 border-r">Monday</th>
      <th className="p-2 border-r">Tuesday</th>
      <th className="p-2 border-r">Wednesday</th>
      <th className="p-2 border-r">Thursday</th>
      <th className="p-2 border-r">Friday</th>
      <th className="p-2 border-r">Saturday</th>
              </tr>
            </thead>
            <tbody>
              {coursesData.length > 0 ? (
                coursesData.map((row) => (
                  <tr  className="border-b text-center">
                    <td className="p-2 border-r">{row.course_id} {row.name}<br />
            <span className="text-sm text-gray-600">({row.lecture_name})</span></td>
                 
                    {/* 6 days of week */}
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <td key={day} className="p-2 border-r">
              {/* you can later replace this with dynamic schedule data */}
              <td key={day} className="p-2 border-r">
              {getRandomSlot()}
            </td>
            </td>
          ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">No Course data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </div>

    </section>
    </div>
  );
}
