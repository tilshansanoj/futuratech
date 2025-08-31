import { useState, useEffect } from "react";
import axios from 'axios';
import { getBaseURL } from "../../apiConfig";
import '../Home.css';

export default function Home() {
    const [studentData, setStudentData] = useState([]);
    const [error, setError] = useState(null);
     const [loading, setLoading] = useState(true);

const fetchStudentData = () => {
  axios.get(getBaseURL() + "api/stuassignments/myresults/"+sessionStorage.getItem("name"))
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
        <h2 className="text-2xl font-bold mb-4">My Results</h2>
      </section>
      
<section id="form" className="">
    {/* Right Side: Table */}
    <div className="w-full bg-white p-6 shadow-md rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 border-r">#</th>
                <th className="p-2 border-r">Course</th>
                <th className="p-2 border-r">Assignment</th>
                <th className="p-2 border-r">Marks</th>
                <th className="p-2 border-r">Grade</th>
                
              </tr>
            </thead>
            <tbody>
              {studentData.length > 0 ? (
                studentData.map((row, index) => (
                  <tr  className="border-b text-center">
                    <td className="p-2 border-r">{index +1}</td>
                    <td className="p-2 border-r">{row.course}</td>
                <td className="p-2 border-r">{row.assinname}</td>
                <td className="p-2 border-r">{row.mark}</td>   
                <td className="p-2 border-r">{row.grade}</td> 
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">No Results Data Available</td>
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
