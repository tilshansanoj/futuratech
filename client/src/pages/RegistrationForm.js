import React, { useState , useEffect  } from 'react';
import axios from 'axios';
import { getBaseURL } from "../apiConfig";
import { useParams } from 'react-router-dom';


function RegistrationForm() {
  const { course } = useParams();
  const [coursesData, setCoursesData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    nic: '',
    citizenship: '',
    course: course || '',
    highestedu: '',
  });

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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

   const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(getBaseURL()+'api/students/register', formData);
      alert('Registration successful!');

      setFormData({ name: '',
    email: '',
    address: '',
    phone: '',
    nic: '',
    citizenship: '',
    course: '',
    highestedu: '',password:''}); // Clear form

    window.location.href='/login';
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Student Registration</h2>
      <form className="space-y-4" onSubmit={handleRegister}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full border p-2 rounded" required />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" required />
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full border p-2 rounded" />
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full border p-2 rounded" />
        <input name="nic" value={formData.nic} onChange={handleChange} placeholder="NIC" className="w-full border p-2 rounded" />
        <input name="citizenship" value={formData.citizenship} onChange={handleChange} placeholder="Citizenship" className="w-full border p-2 rounded" />

        <select name="course" value={formData.course} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Select Course</option>
          {coursesData.length > 0 ? (
                coursesData.map((row) => (
                 
            <option value={row.name}>{row.course_id} {row.name} </option>
                ))
              ) : (
                
                <option value="">No Course data available</option>
              )}
        </select>

        <select name="highestedu" value={formData.highestedu} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Highest Education</option>
          <option value="PhD">PhD</option>
          <option value="Master">Master</option>
          <option value="Bachelor Degree">Bachelor Degree</option>
          <option value="Passed A/L">Passed A/L</option>
          <option value="Passed O/L">Passed O/L</option>
        </select>
        <div className="mb-4">
        <label>Create Password:</label>
        <input name="password" type="password" onChange={handleChange} required className="w-full p-2 border rounded" />
      </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
