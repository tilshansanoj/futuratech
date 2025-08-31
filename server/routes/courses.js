const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Course = require('../models/Course');
const Counter = require('../models/Counter');

// Register
router.post('/register', async (req, res) => {
  console.log('✅ /register endpoint hit');
  try {
    console.log(req.body)
    const { name,
  duration,
  lecture_name,
  minrequirements,
  notes,
  totalfees,
  coodinator} = req.body;
    const existingCourse = await Course.findOne({ name });
    if (existingCourse) return res.status(400).json({ message: "Course already exists" });

    const counter = await Counter.findByIdAndUpdate(
              "course_id",
              { $inc: { seq: 1 } },
              { new: true, upsert: true }
            );

    const course = new Course({ course_id: counter.seq,
      name,
  duration,
  lecture_name,
  minrequirements,
  notes,
  totalfees,
  coodinator });
    await course.save();
    res.status(201).json({ message: "Course created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/details", async (req, res) => {
  console.log('✅ /details endpoint hit');
  try {
    const course_data =await Course.find(); // Fetch all Course
   console.log(course_data)
    res.status(200).json(course_data); // Respond with Course data
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Failed to fetch course" });
  }
});

router.get("/deta/:id", async (req, res) => {
  
  try {
    const _id=req.params.id;
    const course = await Course.findOne({ _id }); // Fetch all Students
   // console.log(lecture)
    res.status(200).json(course); // Respond with Students data
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Failed to fetch course" });
  }
});

// Update lecture
router.put('/update/:id', async (req, res) => {
  console.log('✅ /update endpoint hit');
  try {
    const { id } = req.params; // lecture_id or MongoDB _id
    const {
      name,
  duration,
  lecture_name,
  minrequirements,
  notes,
  totalfees,
  coodinator
    } = req.body;

    // Find the lecture by ID
    const course = await Course.findOne({ _id: id });
    if (!course) {
      console.log("Course not found" );
      return res.status(404).json({ message: "Course not found" });
    }

    // Update fields only if provided
    if (name) course.name = name;
    if (duration) course.duration = duration;
    if (lecture_name) course.lecture_name = lecture_name;
    if (minrequirements) course.minrequirements = minrequirements;
    if (notes) course.notes = notes;
    if (totalfees) course.totalfees = totalfees;
    if (coodinator) course.coodinator = coodinator;

   

    await course.save();

    res.status(200).json({ message: "Course updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/course_bylec/:name", async (req, res) => {
  //console.log(req.params.name );
  try {
    const name=req.params.name;
    const course = await Course.find({ lecture_name:name }); // Fetch all Students
    //console.log(course)
    res.status(200).json(course); // Respond with Students data
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Failed to fetch course" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // delete by id
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Failed to delete course" });
  }
});

module.exports = router;
