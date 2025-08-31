import { useState, useEffect } from "react";
import axios from 'axios';
import { getBaseURL } from "../../apiConfig";
import '../Home.css';

export default function Home() {
    const [coursesData, setCoursesData] = useState([]);
    const [notesData, setNotesData] = useState([]);
     const [errors, setErrors] = useState({});
     const [loading, setLoading] = useState(true);
     let newErrors = { ...errors };

const fetchCoursesData = () => {
  axios.get(getBaseURL() + "api/students/course_forstu/"+sessionStorage.getItem("name"))
        .then((response) => {
        setCoursesData(response.data);
        console.log(response.data)
    })
    .catch((error) => console.error("Error fetching lecture data:", error));
};





useEffect(() => {
  fetchCoursesData(); // Initial load
  
}, []);


   const veieCourseMeterial = (course) => {
    axios
    .get(getBaseURL()+'api/materials/materials_bycourse/'+course)
    .then((response) => {
        setNotesData(response.data);
        console.log(response.data)
    })
    .catch((error) => console.error("Error fetching lecture notes:", error));
  };

  
  

  return (
    <div>
<section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Course Details </h2>
      </section>
      
<section id="form" className="grid grid-cols-2 gap-2">
    {/* Right Side: Table */}
    <div className="w-full bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Enrolled Course List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 border-r">Courses</th>
                
                <th className="p-2 border-r"></th>
              </tr>
            </thead>
            <tbody>
              {coursesData.length > 0 ? (
                coursesData.map((row) => (
                  <tr  className="border-b text-center">
                    <td className="p-2 border-r">{row.course}</td>
                    <td className="p-2 border-r">
                    <button
    className="px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded" 
    onClick={() => veieCourseMeterial(row.course)}
  >
    View
  </button>
                    </td>
                    
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
<div className="w-full bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">View Course Materials</h2>
        <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 border-r">Title</th>
                <th className="p-2 border-r">Guide</th>
                <th className="p-2 border-r"></th>
              </tr>
            </thead>
            <tbody>
              {notesData.length > 0 ? (
                notesData.map((row) => (
                  <tr  className="border-b text-center">
                    <td className="p-2 border-r">{row.name}</td>
                    <td className="p-2 border-r">{row.guide}</td>
                    <td className="p-2 border-r">
                            <a
    className="px-3 py-1 text-sm text-white bg-green-500 hover:bg-green-600 rounded" 
    href={getBaseURL() +"uploads/"+row.link_url} target="_blank"
  >
    Download
  </a>
                    </td>
                    
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">Select Course to view Meterials</td>
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
