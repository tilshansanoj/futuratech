import { useState, useEffect } from "react";
import axios from 'axios';
import { getBaseURL } from "../../apiConfig";
import '../Home.css';

export default function Home() {
    const [studentData, setStudentData] = useState([]);
    const [error, setError] = useState(null);
     const [loading, setLoading] = useState(true);

const fetchStudentData = () => {
  axios.get(getBaseURL() + "api/students/details")
        .then((response) => {
        setStudentData(response.data);
    })
    .catch((error) => console.error("Error fetching student data:", error));
};



useEffect(() => {
  fetchStudentData(); // Initial load
}, []);

 const openStudentDetails = (studentid) => {
    //props.handleOrderDetails(order);
    window.location.href='/studentdetails/'+studentid;
  };

  return (
    <div>
<section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Student Details</h2>
      </section>
      
<section id="form" className="">
    {/* Right Side: Table */}
    <div className="w-full bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Student List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 border-r">Student Id</th>
                <th className="p-2 border-r">Name</th>
                <th className="p-2 border-r">Email</th>
                <th className="p-2 border-r">Phone</th>
                <th className="p-2 border-r">Course</th>
                <th className="p-2 border-r">Nic</th>
                <th className="p-2 border-r">Educational Level</th>
                <th className="p-2 border-r">Address</th>
                
              </tr>
            </thead>
            <tbody>
              {studentData.length > 0 ? (
                studentData.map((row) => (
                  <tr  className="border-b text-center">
                    <td className="p-2 border-r">{row.student_id}</td>
                    <td className="p-2 border-r">{row.name}</td>
                <td className="p-2 border-r">{row.email}</td>
                <td className="p-2 border-r">{row.phone}</td>
                <td className="p-2 border-r">{row.course}</td>
                <td className="p-2 border-r">{row.nic}</td>
                <td className="p-2 border-r">{row.highestedu}</td>
                <td className="p-2 border-r">{row.address}</td>    
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">No Students data available</td>
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
