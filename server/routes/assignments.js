const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Assignments = require('../models/Assignments');
const Counter = require('../models/Counter');
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
    
    const { name, guide, course,lastdate } = req.body;
    

      console.log("Before update:", await Counter.findById("assignment_id"));
    const counter = await Counter.findByIdAndUpdate(
      "assignment_id",
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
     
     console.log("After update:", counter);

    const assignments = new Assignments({ assignment_id: counter.seq,
      name, guide, link_url,course,lastdate });
    //console.log(assignments)
    await assignments.save();
    res.status(201).json({ message: "Assignment created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get("/details", async (req, res) => {
  try {
    const assignments = await Assignments.find(); // Fetch all Assignments
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
    const assignments = await Assignments.findOne({ _id }); // Fetch all assignments
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
    const deletedCourse = await Assignments.findByIdAndDelete(id);

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
    const assignment = await Assignments.find({ course: { $in: courseNames } })
      .sort({ _id: -1 }); // latest first

    res.status(200).json(assignment); // Respond with Students data
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});

router.get("/assignments_forstu/:student", async (req, res) => {
  //console.log(req.params.name );
  try {
    const student=req.params.student;

    const enrolled = await StudentsCourse.find({ name:student });
    //console.log(course)

    const courseNames = enrolled.map(e => e.course);

    // Step 2: Get assignments for those courses
    const assignment = await Assignments.find({ course: { $in: courseNames } })
      .sort({ _id: -1 }); // latest first

    res.status(200).json(assignment); // Respond with Students data
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});



module.exports = router;
