import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getBaseURL } from "../../apiConfig";
import '../Home.css';

export default function Home() {
  const { id } = useParams();
    const [assignmentData, setAssignmentData] = useState([]);
    const [submitData, setSubmitData] = useState([]);
    const [checkedAssignments, setCheckedAssignments] = useState({});
     const [attain, setAttain]=useState(false);
     const [answer, setAnswer]=useState(false);

const fetchAssignmentData = () => {
  axios.get(getBaseURL() + "api/stuassignments/studentlist/"+id)
        .then((response) => {
        setAssignmentData(response.data);
        console.log(id);
       
    })
    .catch((error) => console.error("Error fetching lecture data:", error));
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  
    
  };

   const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(getBaseURL()+'api/stuassignments/marksUpdate', formData);
      alert('Submit successful!');

      setFormData({id: '',
    mark:'',}); // Clear form
    } catch (err) {
      alert(err.response?.data?.message || 'Submit failed');
    }
     fetchAssignmentData();
     setAttain(false)
  };

   const [formData, setFormData] = useState({
    id: '',
    mark:'',
  });


useEffect(() => {
  fetchAssignmentData(); // Initial load
}, []);

   const uploadCourse = (id) => {
    axios.get(getBaseURL() + "api/stuassignments/deta/"+id)
        .then((response) => {
        setSubmitData(response.data);
        //console.log(response.data.name);
        setFormData({ id: response.data._id});

       

    })
    .catch((error) => console.error("Error fetching assignment data:", error));
    setAttain(true)
  };



  return (
    <div>
<section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Assignments Details </h2>
      </section>
      
<section id="form" className="grid grid-cols-2 gap-2">
    {/* Right Side: Table */}
    <div className="w-full bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Assignments List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 border-r">No</th>
                <th className="p-2 border-r">Student</th>
                <th className="p-2 border-r">Course</th>
                <th className="p-2 border-r">Submit Date</th>
                <th className="p-2 border-r">Marks</th>
                <th className="p-2 border-r">Grade</th>
                <th className="p-2 border-r">View</th>
                
              </tr>
            </thead>
            <tbody>
              {assignmentData.length > 0 ? (
                assignmentData.map((row, index) => (
                  <tr  className="border-b text-center">
                    <td className="p-2 border-r">{index + 1}</td>
                    <td className="p-2 border-r">{row.name}</td>
                <td className="p-2 border-r">{row.course}</td>
                <td className="p-2 border-r">{row.submitdate}</td>
                    <td className="p-2 border-r">{row.mark}</td>
                    <td className="p-2 border-r">{row.grade}</td>
                    <td className="p-2 border-r">
                     
                      {row.mark && row.mark > 0 ? (
         <a
    className="px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded" 
    href={getBaseURL() +"uploads/"+row.link_url} target="_blank"
  >
    View
  </a>
        ) : (
          <button 
    className="px-3 py-1 text-sm text-white bg-green-500 hover:bg-green-600 rounded" 
    onClick={() => uploadCourse(row._id)}
  >
    Check
  </button>
        )}
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
{attain && (<div className="w-full bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Submit Answer Sheets</h2>
        <div className="overflow-x-auto">
      <form className="space-y-4" onSubmit={handleRegister}>
        <div className="mb-4">
        <label>Title: {submitData.assinname}</label>
        <input type="hidden" name="id" value={formData.id} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" />
         
        </div>
        
        <div className="mb-4">
        <label>Course: {submitData.course}</label>
        
         </div>
         <div className="mb-4">
      <label>Submission Date: {submitData.submitdate}</label>
        </div>
        <div className="mb-4">
        <label>Answers :</label>
        <a
    className="px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded" 
    href={getBaseURL() +"uploads/"+submitData.link_url} target="_blank"
  >
    View
  </a>
      </div>
      <div className="mb-4">
        <label>Marks</label>
        <input type="number" name="mark" value={formData.mark} onChange={handleChange} placeholder="Marks" className="w-full border p-2 rounded" required/>
        
        </div>
       
      

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Update
        </button>
      </form>
      </div>
    </div>)}

    </section>
    </div>
  );
}
