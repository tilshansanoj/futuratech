import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getBaseURL } from "../../apiConfig";
import '../Home.css';

export default function Home() {
    const { id } = useParams();
    const [coursesData, setCoursesData] = useState([]);
    const [lectureData, setLectureData] = useState([]);
     const [errors, setErrors] = useState({});
     let newErrors = { ...errors };

       const [formData, setFormData] = useState({
   name: '',
    duration: '',
    lecture_name: '',
    minrequirements: '',
    notes:'',
    totalfees: '',
    coodinator:'',
  });

const fetchCoursesData = () => {
  axios.get(getBaseURL() + "api/courses/deta/"+id)
        .then((response) => {
        setCoursesData(response.data);
        console.log(response.data.name);
        setFormData({ name: response.data.name,
    duration: response.data.duration,
    lecture_name: response.data.lecture_name,
    minrequirements: response.data.minrequirements,
    notes:response.data.notes,
    totalfees: response.data.totalfees,
    coodinator:response.data.coodinator,});
    })
    .catch((error) => console.error("Error fetching lecture data:", error));
};
const fetchLectureData = () => {
  axios.get(getBaseURL() + "api/lectures/details")
        .then((response) => {
        setLectureData(response.data);
    })
    .catch((error) => console.error("Error fetching lecture data:", error));
};


useEffect(() => {
  fetchLectureData(); // Initial load
  fetchCoursesData();
}, []);



  
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    newErrors[name] = "";
    if (name === "nic") {
      // Allow user to type freely but validate separately

      // Validation: NIC should be 12 digits OR 8 digits + 'V' or 'X'
      const nicPattern = /^(?:\d{12}|\d{9}[VXvx])$/;
      if (value.length > 0 && !nicPattern.test(value)) {
          newErrors[name] = "NIC must be 12 digits or 8 digits + 'V'/'X'";
      } else {
          newErrors[name] = "";
      }

      
    }
      if (name === "officialphone") {
    // Regular Expression to allow only exactly 10 digits
    const phonePattern = /^\d{10}$/;

    if (value.length  > 0 &&  !phonePattern.test(value)) {
         // Clear error if valid
         newErrors[name] = "Phone number must be exactly 10 digits";
    }else{
      
      newErrors[name] = "";
    }

  }
  if (name === "email") {
    // Regular Expression to allow only exactly 10 digits
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value.length  > 0 &&  !regex.test(value)) {
         // Clear error if valid
         newErrors[name] = "Invalid email address";
    }else{
      
      newErrors[name] = "";
    }

  }
    setErrors(newErrors);
    
  };

   const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(getBaseURL()+'api/courses/update/'+id, formData);
      if(res){
alert('Update successful!');

      setFormData({ name: '',
    duration: '',
    lecture_name: '',
    minrequirements: '',
    notes:'',
    totalfees: '',
    coodinator:'',}); // Clear form
      }
      
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
    fetchCoursesData();
  };

  return (
    <div>
<section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Course Details - {coursesData.name}</h2>
      </section>
      
<section id="form" className="grid grid-cols-2 gap-2">
    {/* Right Side: Table */}
    

    {/* Right Side: Table */}
    <div className="w-full bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Course Details</h2>
        <div className="overflow-x-auto">

      <form className="space-y-4" onSubmit={handleRegister}>
        
       
        <div >
            <label className="block font-medium capitalize">Course Name</label>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Course Name" className="w-full border p-2 rounded" required />
         </div>
       
        <div >
            <label className="block font-medium capitalize">Duration</label>
        <input name="duration" value={formData.duration} onChange={handleChange} placeholder="Course Duration" className="w-full border p-2 rounded" />
        </div>
       
        <div >
            <label className="block font-medium capitalize">Course Lecture</label>
        <select name="lecture_name" value={formData.lecture_name} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Select Course Lecture</option>
          
          {lectureData.length > 0 ? (
                lectureData.map((row) => (
                  <option value={row.name} >{row.name}</option>
                ))
              ) : (
                <option value="">No Course data available</option>
                
              )}
        </select>
</div>
       
        <div >
            <label className="block font-medium capitalize">Required Academic Level</label>
        <select name="minrequirements" value={formData.minrequirements} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Required Academic Level</option>
          <option value="PhD">PhD</option>
          <option value="Master">Master</option>
          <option value="Bachelor Degree">Bachelor Degree</option>
          <option value="Passed A/L">Passed A/L</option>
          <option value="Passed O/L">Passed O/L</option>
        </select>

        
       </div>
       
        <div >
            <label className="block font-medium capitalize">Course Description</label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Course Description" className="w-full border p-2 rounded" />
      </div>
       
        <div >
            <label className="block font-medium capitalize">Total Fee</label>
      <input name="totalfees" value={formData.totalfees} onChange={handleChange} placeholder="Total Fee" className="w-full border p-2 rounded" />
       </div>
       
        <div >
            <label className="block font-medium capitalize">Coodinator</label>
        <input name="coodinator" value={formData.coodinator} onChange={handleChange} placeholder="Coodinator" className="w-full border p-2 rounded" />
        </div>
        
        
   
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Update
        </button>
      </form>
      </div>
    </div>
    </section>
    </div>
  );
}
