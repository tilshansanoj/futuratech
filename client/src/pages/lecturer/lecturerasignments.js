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
  axios.get(getBaseURL() + "api/courses/course_bylec/"+sessionStorage.getItem("name"))
        .then((response) => {
        setCoursesData(response.data);
        console.log(response.data)
    })
    .catch((error) => console.error("Error fetching lecture data:", error));
};

const fetchNotesData = () => {
  axios.get(getBaseURL() + "api/assignments/details_bylec/"+sessionStorage.getItem("name"))
        .then((response) => {
        setNotesData(response.data);
    })
    .catch((error) => console.error("Error fetching assignments data:", error));
};



useEffect(() => {
  fetchCoursesData(); // Initial load
  fetchNotesData();
}, []);


   const deleteCourse = (matid) => {
    axios
    .delete(getBaseURL()+'api/assignments/'+matid)
    .then((res) => {
      console.log("Deletion successful");
      //fetchProductsCat();
      alert('Deletion successful!');

      fetchNotesData();

    })
    .catch((err) => console.log("Error"));
  };

  
  const [formData, setFormData] = useState({
    name: '',
    guide: '',
    link: null,
    course:'',
    lastdate:'',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  
    
  };

   const handleRegister = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("name", formData.name);
     data.append("guide", formData.guide);
  data.append("link", formData.link);
  data.append("course", formData.course);
  data.append('lastdate',formData.lastdate);
    try {
      const res = await axios.post(getBaseURL()+'api/assignments/register', data,{
          headers: {
        "Content-Type": "multipart/form-data",
      },});
      alert('Submit successful!');

      setFormData({ name: '',
    guide: '',
    link: null,
    course:'',lastdate:''}); // Clear form
    } catch (err) {
      alert(err.response?.data?.message || 'Submit failed');
    }
    fetchNotesData();
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
                <th className="p-2 border-r">Id</th>
                <th className="p-2 border-r">Title</th>
                <th className="p-2 border-r">Course</th>
                <th className="p-2 border-r">Date</th>
                <th className="p-2 border-r">Files</th>
                
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
                <td className="p-2 border-r">{row.lastdate}</td>
                    <td className="p-2 border-r">
                    <a
    className="px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded" 
    href={getBaseURL() +"uploads/"+row.link_url} target="_blank"
  >
    View
  </a>
                    </td>
                    <td className="p-2 border-r">
                      <button 
    className="px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded" 
    onClick={() => deleteCourse(row._id)}
  >
    Delete
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

    {/* Right Side: Table */}
    <div className="w-full bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Add New Assignments</h2>
        <div className="overflow-x-auto">
      <form className="space-y-4" onSubmit={handleRegister}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" required />
         
        <textarea name="guide" value={formData.guide} onChange={handleChange} placeholder="Guide" className="w-full border p-2 rounded" required/>
        
        <select name="course" value={formData.course} onChange={handleChange} className="w-full border p-2 rounded" required>
          <option value="">Select Course</option>
         {coursesData.length > 0 ? (
                coursesData.map((row) => (
                 
            <option value={row.name}>{row.course_id} {row.name} </option>
                ))
              ) : (
                
                <option value="">No Course data available</option>
              )}
        </select>
        <div className="mb-4">
        <label>Upload Files:</label>
        <input name="link" type="file" onChange={(e) => setFormData({ ...formData, link: e.target.files[0] })} required className="w-full p-2 border rounded" />
      </div>
      <div className="mb-4">
      <label>Submission Date:</label>
      <input name="lastdate" type="date" value={formData.lastdate} onChange={handleChange} placeholder="Submission Date" className="w-full border p-2 rounded" required />
         </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
      </div>
    </div>
    </section>
    </div>
  );
}
