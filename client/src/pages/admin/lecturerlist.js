import { useState, useEffect } from "react";
import axios from 'axios';
import { getBaseURL } from "../../apiConfig";
import '../Home.css';

export default function Home() {
    const [lectureData, setLectureData] = useState([]);
     const [errors, setErrors] = useState({});
     const [loading, setLoading] = useState(true);
     let newErrors = { ...errors };

const fetchLectureData = () => {
  axios.get(getBaseURL() + "api/lectures/details")
        .then((response) => {
        setLectureData(response.data);
    })
    .catch((error) => console.error("Error fetching lecture data:", error));
};



useEffect(() => {
  fetchLectureData(); // Initial load
}, []);

 const openLectureDetails = (lectureid) => {
    //props.handleOrderDetails(order);
    window.location.href='/lectureredit/'+lectureid;
  };

  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    officialphone: '',
    personalphone:'',
    nic: '',
    eduIn:'',
    experices:'',
    education: '',
    password:'',
  });

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
      const res = await axios.post(getBaseURL()+'api/lectures/register', formData);
      alert('Registration successful!');

      setFormData({ name: '',
    email: '',
    address: '',
    officialphone: '',
    personalphone:'',
    nic: '',
    eduin:'',
    experices:'',
    education: '',password:''}); // Clear form
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
    fetchLectureData();
  };

  return (
    <div>
<section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Lecturer Details</h2>
      </section>
      
<section id="form" className="grid grid-cols-2 gap-2">
    {/* Right Side: Table */}
    <div className="w-full bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Lecturer List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 border-r">Lecture Id</th>
                <th className="p-2 border-r">Name</th>
                <th className="p-2 border-r">Email</th>
                <th className="p-2 border-r">Official Phone</th>
                <th className="p-2 border-r"></th>
              </tr>
            </thead>
            <tbody>
              {lectureData.length > 0 ? (
                lectureData.map((row) => (
                  <tr  className="border-b text-center">
                    <td className="p-2 border-r">{row.lecture_id}</td>
                    <td className="p-2 border-r">{row.name}</td>
                <td className="p-2 border-r">{row.email}</td>
                 <td className="p-2 border-r">{row.officialphone}</td>
                    <td className="p-2 border-r">
                    <button 
    className="px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded" 
    onClick={() => openLectureDetails(row._id)}
  >
    View
  </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">No Lectures data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </div>

    {/* Right Side: Table */}
    <div className="w-full bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Add New Lecturer</h2>
        <div className="overflow-x-auto">
      <form className="space-y-4" onSubmit={handleRegister}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full border p-2 rounded" required />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" required />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
         
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full border p-2 rounded" />
        <input name="officialphone" value={formData.officialphone} onChange={handleChange} placeholder="Official Phone Number" className="w-full border p-2 rounded" required/>
        {errors.officialphone && <p className="text-red-500 text-sm mt-1">{errors.officialphone}</p>}
          
        <input name="personalphone" value={formData.personalphone} onChange={handleChange} placeholder="Personal Phone Number" className="w-full border p-2 rounded" />
        
        <input name="nic" value={formData.nic} onChange={handleChange} placeholder="NIC" className="w-full border p-2 rounded" />
        {errors.nic && <p className="text-red-500 text-sm mt-1">{errors.nic}</p>}
          
        <textarea name="eduIn" value={formData.eduIn} onChange={handleChange} placeholder="Academic & Skills" className="w-full border p-2 rounded" />
        <textarea name="experices" value={formData.experices} onChange={handleChange} placeholder="Experices" className="w-full border p-2 rounded" />
        

        <select name="highestedu" value={formData.education} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Highest Academic Level</option>
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
    </div>
    </section>
    </div>
  );
}
