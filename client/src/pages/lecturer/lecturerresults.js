import { useState, useEffect } from "react";
import axios from 'axios';
import { getBaseURL } from "../../apiConfig";
import '../Home.css';

export default function Home() {
    const [notesData, setNotesData] = useState([]);
     const [errors, setErrors] = useState({});
     const [loading, setLoading] = useState(true);
     let newErrors = { ...errors };



const fetchNotesData = () => {
  axios.get(getBaseURL() + "api/assignments/details_bylec/"+sessionStorage.getItem("name"))
        .then((response) => {
        setNotesData(response.data);
    })
    .catch((error) => console.error("Error fetching assignments data:", error));
};



useEffect(() => {
   // Initial load
  fetchNotesData();
}, []);

 const viewAnswer = (id) => {
    //props.handleOrderDetails(order);
    window.location.href='/checkassignments/'+id;
  };

  return (
    <div>
<section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Student Submission Details </h2>
      </section>
      
<section id="form" className="grid grid-cols-1 gap-2">
    {/* Right Side: Table */}
    <div className="w-full bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Assignments List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 border-r">Id</th>
                <th className="p-2 border-r">Title</th>
                <th className="p-2 border-r">Course</th>
                <th className="p-2 border-r">Guide</th>
                <th className="p-2 border-r">Date</th>
                
                <th className="p-2 border-r">Answer Sheets</th>
                
                <th className="p-2 border-r"></th>
              </tr>
            </thead>
            <tbody>
              {notesData.length > 0 ? (
                notesData.map((row) => (
                  <tr  className="border-b text-center">
                    <td className="p-2 border-r">{row.assignment_id}</td>
                    <td className="p-2 border-r">{row.name}</td>
                <td className="p-2 border-r">{row.course}</td>
                <td className="p-2 border-r">{row.guide}</td>
                <td className="p-2 border-r">{row.lastdate}</td>
                    <td className="p-2 border-r">
            
   <button 
    className="px-3 py-1 text-sm text-white bg-green-500 hover:bg-green-600 rounded" 
    onClick={() => viewAnswer(row._id)}
  >
    View Student Submission
  </button>
                    </td>
                    
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">No Assignments Materials data available</td>
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
