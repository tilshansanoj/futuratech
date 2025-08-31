import { useState, useEffect } from "react";
import axios from 'axios';
import { getBaseURL } from "../../apiConfig";
import '../Home.css';

export default function Home() {
    const [coursesData, setCoursesData] = useState([]);
    const [lectureData, setLectureData] = useState([]);
     const [errors, setErrors] = useState({});
     const [loading, setLoading] = useState(true);

const fetchCoursesData = () => {
  axios.get(getBaseURL() + "api/courses/details")
        .then((response) => {
        setCoursesData(response.data);
        console.log(response.data)
    })
    .catch((error) => console.error("Error fetching course data:", error));
};

const fetchLectureData = () => {
  axios.get(getBaseURL() + "api/lectures/details")
        .then((response) => {
        setLectureData(response.data);
    })
    .catch((error) => console.error("Error fetching lecture data:", error));
};



useEffect(() => {
  fetchCoursesData(); // Initial load
  fetchLectureData();
}, []);

 const openCoursesDetails = (courseid) => {
    //props.handleOrderDetails(order);
    window.location.href='/coursesedit/'+courseid;
  };

  
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    lecture_name: '',
    minrequirements: '',
    notes:'',
    totalfees: '',
    coodinator:'',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    
  };

   const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(getBaseURL()+'api/courses/register', formData);
      alert('Registration successful!');

      setFormData({ name: '',
    duration: '',
    lecture_name: '',
    minrequirements: '',
    notes:'',
    totalfees: '',
    coodinator:'',}); // Clear form
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
    fetchCoursesData();
  };

  return (
    <div>
<section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Courses Details</h2>
      </section>
      
<section id="form" className="grid grid-cols-2 gap-2">
    {/* Right Side: Table */}
    <div className="w-full bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Courses List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 border-r">Course Id</th>
                <th className="p-2 border-r">Course Name</th>
                <th className="p-2 border-r">Lecturer</th>
                <th className="p-2 border-r">Duration</th>
                <th className="p-2 border-r"></th>
              </tr>
            </thead>
            <tbody>
              {coursesData.length > 0 ? (
                coursesData.map((row) => (
                  <tr  className="border-b text-center">
                    <td className="p-2 border-r">{row.course_id}</td>
                    <td className="p-2 border-r">{row.name}</td>
                <td className="p-2 border-r">{row.lecture_name}</td>
                 <td className="p-2 border-r">{row.duration}</td>
                    <td className="p-2 border-r">
                    <button 
    className="px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded" 
    onClick={() => openCoursesDetails(row._id)}
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

    {/* Right Side: Table */}
    <div className="w-full bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Add New Courses</h2>
        <div className="overflow-x-auto">
      <form className="space-y-4" onSubmit={handleRegister}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Course Name" className="w-full border p-2 rounded" required />
         
        <input name="duration" value={formData.duration} onChange={handleChange} placeholder="Course Duration" className="w-full border p-2 rounded" />
        
        <select name="lecture_name" value={formData.lecture_name} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Select Course Lecture</option>
          
          {lectureData.length > 0 ? (
                lectureData.map((row) => (
                  <option value={row.name}>{row.name}</option>
                ))
              ) : (
                <option value="">No Course data available</option>
                
              )}
        </select>

        <select name="minrequirements" value={formData.minrequirements} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Required Academic Level</option>
          <option value="PhD">PhD</option>
          <option value="Master">Master</option>
          <option value="Bachelor Degree">Bachelor Degree</option>
          <option value="Passed A/L">Passed A/L</option>
          <option value="Passed O/L">Passed O/L</option>
        </select>

        
       
        <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Course Description" className="w-full border p-2 rounded" />
      <input name="totalfees" value={formData.totalfees} onChange={handleChange} placeholder="Total Fee" className="w-full border p-2 rounded" />
        <input name="coodinator" value={formData.coodinator} onChange={handleChange} placeholder="Coodinator" className="w-full border p-2 rounded" />
        
        
        

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
