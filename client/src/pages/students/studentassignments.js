import { useState, useEffect } from "react";
import axios from 'axios';
import { getBaseURL } from "../../apiConfig";
import '../Home.css';

export default function Home() {
    const [assignmentData, setAssignmentData] = useState([]);
    const [submitData, setSubmitData] = useState([]);
    const [checkedAssignments, setCheckedAssignments] = useState({});
    const [answerData, setAnswerData] = useState([]);
     const [errors, setErrors] = useState({});
     const [loading, setLoading] = useState(true);
     let newErrors = { ...errors };
     const [attain, setAttain]=useState(false);
     const [answer, setAnswer]=useState(false);
     const [attainbtn, setAttainBtn]=useState(false);

const fetchAssignmentData = () => {
  axios.get(getBaseURL() + "api/assignments/assignments_forstu/"+sessionStorage.getItem("name"))
        .then((response) => {
        setAssignmentData(response.data);
        //console.log(response.data.name);
       
    })
    .catch((error) => console.error("Error fetching lecture data:", error));
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  
    
  };

   const handleRegister = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("name", formData.name);
  data.append("assign_id", formData.assign_id);
  data.append("assinname", formData.assinname);
  data.append("link", formData.link);
  data.append("course", formData.course);

    try {
      const res = await axios.post(getBaseURL()+'api/stuassignments/register', data,{
          headers: {
        "Content-Type": "multipart/form-data",
      },});
      alert('Submit successful!');

      setFormData({  name: sessionStorage.getItem("name"),
    assinname:'',
    course:'',
    assign_id:'',
    link: null,}); // Clear form
    setAttain(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Submit failed');
    }
     fetchAssignmentData();
  };

   const [formData, setFormData] = useState({
    name: sessionStorage.getItem("name"),
    assinname:'',
    course:'',
    assign_id:'',
    link: null,
  });


useEffect(() => {
  fetchAssignmentData(); // Initial load
}, []);

   const uploadCourse = (id) => {
    axios.get(getBaseURL() + "api/assignments/deta/"+id)
        .then((response) => {
        setSubmitData(response.data);
        //console.log(response.data.name);
        setFormData({ name: sessionStorage.getItem("name"),
          assinname:response.data.name,
    course: response.data.course,
    lastdate: response.data.lastdate,
  guide:response.data.guide,
assign_id:response.data._id});

       

    })
    .catch((error) => console.error("Error fetching assignment data:", error));
    setAttain(true)
    setAnswer(false)
  };

  const viewAnswer=(id)=>{
axios.get(getBaseURL() + "api/stuassignments/answer/" + sessionStorage.getItem("name") + "/" + id)
        .then((response) => {
        setAnswerData(response.data);
        

       

    })
    .catch((error) => console.error("Error fetching assignment data:", error));
    setAnswer(true)
    setAttain(false)
  }

async function attainChecked(id) {
  try {
    const res = await fetch(
      getBaseURL() + "api/stuassignments/answer/" + sessionStorage.getItem("name") + "/" + id
    );
    const data = await res.json();
    console.log(data)

  setCheckedAssignments((prev) => ({
  ...prev,
  [id]:
    (Array.isArray(data) && data.length > 0) || // case: API returns array
    (data && !Array.isArray(data))              // case: API returns single object
}));

  } catch (err) {
    console.error("Error fetching assignment status:", err);
  }
}

useEffect(() => {
  assignmentData.forEach(row => {
    attainChecked(row._id);
  });
}, [assignmentData]);




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
              {assignmentData.length > 0 ? (
                assignmentData.map((row) => (
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
    Assignment
  </a>
                    </td>
                    <td className="p-2 border-r">
                     
                      {checkedAssignments[row._id] ? (
          <button 
    className="px-3 py-1 text-sm text-white bg-green-500 hover:bg-green-600 rounded" 
    onClick={() => viewAnswer(row._id)}
  >
    View your Answer
  </button>
        ) : (
          <button 
    className="px-3 py-1 text-sm text-white bg-green-500 hover:bg-green-600 rounded" 
    onClick={() => uploadCourse(row._id)}
  >
    Attain
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
        <label>Title: {submitData.name}</label>
        <input type="hidden" name="name" value={formData.name} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" />
         <input type="hidden" name="assinname" value={formData.assinname} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" />
        
        </div>
        <div className="mb-4">
         <label>Guide: {submitData.guide}</label>
        </div>
        <div className="mb-4">
        <label>Course: {submitData.course}</label>
        <input type="hidden" name="course" value={formData.course} onChange={handleChange}  placeholder="course" className="w-full border p-2 rounded" />
        <input type="hidden" name="assign_id" value={formData.assign_id} onChange={handleChange} />
        
         </div>
         <div className="mb-4">
      <label>Submission Date: {submitData.lastdate}</label>
        </div>
        <div className="mb-4">
        <label>Upload Answers as PDF:</label>
        <input name="link" type="file" onChange={(e) => setFormData({ ...formData, link: e.target.files[0] })} required className="w-full p-2 border rounded" />
      </div>
      

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
      </div>
    </div>)}
    

    {answer && (<div className="w-full bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Your Answer Sheets</h2>
        <div className="overflow-x-auto">
        <div className="mb-4">
        <label>Title: {answerData.assinname}</label>
        
        </div>
        
        <div className="mb-4">
        <label>Course: {answerData.course}</label>
        
         </div>
         <div className="mb-4">
      <label>Submited Date: {answerData.submitdate}</label>
        </div>
        <div className="mb-4">
        <label>Your Answer:   <a
    className="px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded" 
    href={getBaseURL() +"uploads/"+answerData.link_url} target="_blank"
  >
    Download
  </a></label>
       </div>
       <div className="mb-4">
      <label>Mark: {answerData.mark}</label>
        </div>
        <div className="mb-4">
      <label>Grade: {answerData.grade}</label>
        </div>
      
      </div>
    </div>)}
    </section>
    </div>
  );
}
