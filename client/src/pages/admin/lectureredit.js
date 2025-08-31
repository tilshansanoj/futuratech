import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getBaseURL } from "../../apiConfig";
import '../Home.css';

export default function Home() {
    const { id } = useParams();
    const [lectureData, setLectureData] = useState([]);
     const [errors, setErrors] = useState({});
     let newErrors = { ...errors };

       const [formData, setFormData] = useState({
    name: 'test',
    email: '',
    address: '',
    officialphone: '',
    personalphone:'',
    nic: '',
    eduIn:'',
    experices:'',
    education: '',
    password:'',
    lecid:'',
  });

const fetchLectureData = () => {
  axios.get(getBaseURL() + "api/lectures/deta/"+id)
        .then((response) => {
        //setLectureData(response.data);
        console.log(response.data.name);
        setFormData({ name: response.data.name,
    email: response.data.email,
    address: response.data.address,
    officialphone: response.data.officialphone,
    personalphone:response.data.personalphone,
    nic: response.data.nic,
    eduIn:response.data.eduin,
    experices:response.data.experices,
    education: response.data.education,lecid:response.data._id,});
    })
    .catch((error) => console.error("Error fetching lecture data:", error));
};



useEffect(() => {
  fetchLectureData(); // Initial load
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
      const res = await axios.put(getBaseURL()+'api/lectures/update/'+id, formData);
      if(res){
alert('Registration successful!');

      setFormData({ name: '',
    email: '',
    address: '',
    officialphone: '',
    personalphone:'',
    nic: '',
    eduin:'',
    experices:'',
    education: '',}); // Clear form
      }
      
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
    fetchLectureData();
  };

  return (
    <div>
<section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Lecturer Details - {lectureData.name}</h2>
      </section>
      
<section id="form" className="grid grid-cols-2 gap-2">
    {/* Right Side: Table */}
    

    {/* Right Side: Table */}
    <div className="w-full bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Lecturer Details</h2>
        <div className="overflow-x-auto">

      <form className="space-y-4" onSubmit={handleRegister}>
        
       
        <div >
            <label className="block font-medium capitalize">Name</label>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full border p-2 rounded" required />
        </div>
       
        <div >
            <label className="block font-medium capitalize">Email</label>
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" required />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
         </div>
       
        <div >
            <label className="block font-medium capitalize">Address</label>
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full border p-2 rounded" />
        </div>
       
        <div >
            <label className="block font-medium capitalize">Office Phone</label>
        <input name="officialphone" value={formData.officialphone} onChange={handleChange} placeholder="Official Phone Number" className="w-full border p-2 rounded" required/>
        {errors.officialphone && <p className="text-red-500 text-sm mt-1">{errors.officialphone}</p>}
          </div>
       
        <div >
            <label className="block font-medium capitalize">Personal Phone</label>
        <input name="personalphone" value={formData.personalphone} onChange={handleChange} placeholder="Personal Phone Number" className="w-full border p-2 rounded" />
        
        </div>
       
        <div >
            <label className="block font-medium capitalize">Nic</label>
        <input name="nic" value={formData.nic} onChange={handleChange} placeholder="NIC" className="w-full border p-2 rounded" />
        {errors.nic && <p className="text-red-500 text-sm mt-1">{errors.nic}</p>}
          </div>
       
        <div >
            <label className="block font-medium capitalize">Academic & Skills</label>
        <input type="text" name="eduIn" value={formData.eduIn} onChange={handleChange} placeholder="Academic & Skills" className="w-full border p-2 rounded" />
       </div>
       
        <div >
            <label className="block font-medium capitalize">Experices</label>
        <input type="text" name="experices" value={formData.experices} onChange={handleChange} placeholder="Experices" className="w-full border p-2 rounded" />
        </div>
       
        <div >
          <label className="block font-medium capitalize">Highest Academic Level</label>
        <select name="highestedu" value={formData.education} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Highest Academic Level</option>
          <option value="PhD">PhD</option>
          <option value="Master">Master</option>
          <option value="Bachelor Degree">Bachelor Degree</option>
          <option value="Passed A/L">Passed A/L</option>
          <option value="Passed O/L">Passed O/L</option>
        </select>
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
