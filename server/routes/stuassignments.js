const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Assignments = require('../models/Assignments');
const Counter = require('../models/Counter');
const StuAssignments=require('../models/StuAssignments');
const StudentsCourse=require('../models/StudentsCourse');
const Course = require('../models/Course');
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    },
});

const upload = multer({ storage });

// Register
router.post('/register', upload.fields([
    { name: "link", maxCount: 1 }]), async (req, res) => {
  const files = req.files;

    // Extract uploaded file names
    const link_url = files.link ? files.link[0].filename : null;
  console.log(' /register endpoint hit');
  try {
    
    const { name, assign_id, assinname,course } = req.body;
    

      console.log("Before update:", await Counter.findById("submit_id"));
    const counter = await Counter.findByIdAndUpdate(
      "submit_id",
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
     
     console.log("After update:", counter);

    const assignments = new StuAssignments({ submit_id: counter.seq,
      name, assign_id, assinname,link_url,course });
    //console.log(assignments)
    await assignments.save();
    res.status(201).json({ message: "Assignment created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get("/details", async (req, res) => {
  try {
    const assignments = await StuAssignments.find(); // Fetch all Assignments
    console.log(assignments)
    res.status(200).json(assignments); // Respond with Assignments data
  } catch (error) {
    console.error("Error fetching Assignments:", error);
    res.status(500).json({ error: "Failed to fetch Assignments" });
  }
});

router.get("/deta/:id", async (req, res) => {
  
  try {
    const _id=req.params.id;
    const assignments = await StuAssignments.findOne({ _id }); // Fetch all assignments
   // console.log(lecture)
    res.status(200).json(assignments); // Respond with assignments data
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // delete by id
    const deletedCourse = await StuAssignments.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Assignments not found" });
    }

    res.status(200).json({ message: "Assignments deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Failed to delete course" });
  }
});

router.get("/details_bylec/:name", async (req, res) => {
  //console.log(req.params.name );
  try {
    const name=req.params.name;
        const course = await Course.find({ lecture_name:name });
    
        const courseNames = course.map(e => e.name);

    // Step 2: Get assignments for those courses
    const assignment = await StudentsCourse.find({ course: { $in: courseNames } })
      .sort({ _id: -1 }); // latest first

    res.status(200).json(assignment); // Respond with Students data
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});

router.get("/answer/:student/:id", async (req, res) => {
  
  try {
    const student=req.params.student;
    const assign_id=req.params.id;

    const assignment = await StuAssignments.findOne({ name:student, assign_id:assign_id});
      console.log(assignment);
      if (!assignment) {
  return res.status(200).json([]); // empty array instead of null
}

    res.status(200).json(assignment); // Respond with Students data
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});

router.get("/studentlist/:id", async (req, res) => {
  console.log(req.params.id)
   try {
    const assign_id=req.params.id;

    const assignment = await StuAssignments.find({ assign_id:assign_id}).sort({ _id: -1 });;
      console.log(assignment);
      if (!assignment) {
  return res.status(200).json([]); // empty array instead of null
}

    res.status(200).json(assignment); // Respond with Students data
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});

router.post('/marksUpdate',  async (req, res) => {
 
  console.log(' /register endpoint hit');
  try {
    
    const { id, mark } = req.body;
    let grade;

    if (mark >= 90) grade = "A+";
    else if (mark >= 85) grade = "A";
    else if (mark >= 80) grade = "A-";
    else if (mark >= 75) grade = "B+";
    else if (mark >= 70) grade = "B";
    else if (mark >= 65) grade = "B-";
    else if (mark >= 55) grade = "C";
    else grade = "D";


    const course = await StuAssignments.findOne({ _id: id });
        if (!course) {
          console.log("Assignment not found" );
          return res.status(404).json({ message: "Assignment not found" });
        }
    
        if (mark) course.mark = mark;
        if (grade) course.grade = grade;
    
       
    
        await course.save();
    res.status(201).json({ message: "Marks created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/myresults/:name", async (req, res) => {
  console.log(req.params.id)
   try {
    const name=req.params.name;

    const assignment = await StuAssignments.find({ name:name}).sort({ _id: -1 });
      console.log(assignment);
      if (!assignment) {
  return res.status(200).json([]); // empty array instead of null
}

    res.status(200).json(assignment); // Respond with Students data
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});

router.get("/getbeststudent", async (req, res) => {
   console.log("hit")
   try {
    

   // const assignment = await StuAssignments.find(
  //{ mark: { $exists: true, $ne: null } } // only docs with marks
//).sort({ mark: -1 });

const assignment = await StuAssignments.aggregate([
  {
    $match: { mark: { $exists: true, $ne: null } } // only with marks
  },
  {
    $group: {
      _id: "$name",          // group by student name
      totalMarks: { $sum: "$mark" }, // sum of marks
      count: { $sum: 1 }     // how many assignments submitted
    }
  },
  {
    $sort: { totalMarks: -1 } // highest total marks first
  }
]);
      console.log(assignment);
      if (!assignment) {
  return res.status(200).json([]); // empty array instead of null
}

    res.status(200).json(assignment); // Respond with Students data
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});

module.exports = router;
