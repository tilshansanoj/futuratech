const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Students = require('../models/Students');
const Counter = require('../models/Counter');
const StudentsCourse=require('../models/StudentsCourse');

// Register
router.post('/register', async (req, res) => {
  console.log(' /register endpoint hit');
  try {
    
    const { name, email, address,phone,nic,citizenship,course,highestedu,password
   } = req.body;
    const existingStudents = await Students.findOne({ email });
    if (existingStudents) return res.status(400).json({ message: "Student already exists" });

      console.log("Before update:", await Counter.findById("student_id"));
    const counter = await Counter.findByIdAndUpdate(
      "student_id",
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
     
     console.log("After update:", counter);

    const hashedPassword = await bcrypt.hash(password, 10);
    const students = new Students({ student_id: counter.seq,
      name, email, address,phone,nic,citizenship,course,highestedu, password: hashedPassword });
    //console.log(students)
    await students.save();

    const studentscourses = new StudentsCourse({
      name,course
    });
    await studentscourses.save();
    res.status(201).json({ message: "Student created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const students = await Students.findOne({ email });
    if (!students) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, students.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: students._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, students: { id: students._id, name: students.name, email: students.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/details", async (req, res) => {
  try {
    const students = await Students.find(); // Fetch all Students
    console.log(students)
    res.status(200).json(students); // Respond with Students data
  } catch (error) {
    console.error("Error fetching Students:", error);
    res.status(500).json({ error: "Failed to fetch Students" });
  }
});

router.get("/course_forstu/:name", async (req, res) => {
  //console.log(req.params.name );
  try {
    const name=req.params.name;
    const course = await StudentsCourse.find({ name:name }); // Fetch all Students
    //console.log(course)
    res.status(200).json(course); // Respond with Students data
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Failed to fetch course" });
  }
});

router.get('/course_addstu/:name/:course', async (req, res) => {
  console.log(' /register endpoint hit');
  try {
    
    const name=req.params.name;
    const course=req.params.course;
    
    const studentscourses = new StudentsCourse({
      name,course
    });
    await studentscourses.save();
    res.status(201).json({ message: "Student enrolled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/stucourse/:id", async (req, res) => {
  try {
    const { id } = req.params;
console.log(id)
    // delete by id
    const deletedCourse = await StudentsCourse.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Failed to delete course" });
  }
});

router.get("/count/:type", async (req, res) => {
  try {
    const type=req.params.type;
    const students = await Counter.findOne({_id:type}); // Fetch all Students
    console.log(students)
    res.status(200).json(students); // Respond with Students data
  } catch (error) {
    console.error("Error fetching Students:", error);
    res.status(500).json({ error: "Failed to fetch Students" });
  }
});

module.exports = router;
