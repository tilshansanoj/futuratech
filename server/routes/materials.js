const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Materials = require('../models/Materials');
const Counter = require('../models/Counter');
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
    
    const { name, guide, course} = req.body;
    
      console.log("Before update:", await Counter.findById("material_id"));
    const counter = await Counter.findByIdAndUpdate(
      "material_id",
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
     
     console.log("After update:", counter);

    const materials = new Materials({ material_id: counter.seq,
      name, guide, link_url,course});
    //console.log(materials)
    await materials.save();
    res.status(201).json({ message: "material created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get("/details", async (req, res) => {
  try {
    const materials = await Materials.find(); // Fetch all Materials
    console.log(materials)
    res.status(200).json(materials); // Respond with Materials data
  } catch (error) {
    console.error("Error fetching Materials:", error);
    res.status(500).json({ error: "Failed to fetch Materials" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // delete by id
    const deletedCourse = await Materials.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Failed to delete course" });
  }
});

router.get("/materials_bycourse/:name", async (req, res) => {
  //console.log(req.params.name );
  try {
    const name=req.params.name;
    const material = await Materials.find({ course:name }); // Fetch all Students
    //console.log(course)
    res.status(200).json(material); // Respond with Students data
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Failed to fetch course" });
  }
});

router.get("/details_bylec/:name", async (req, res) => {
  //console.log(req.params.name );
  try {
    const name=req.params.name;
    const course = await Course.find({ lecture_name:name });

    const courseNames = course.map(e => e.name);
    //console.log(courseNames);
        // Step 2: Get assignments for those courses
        const material = await Materials.find({ course: { $in: courseNames } })
          .sort({ _id: -1 }); // latest first
    //const material = await Materials.find({ course:name }); // Fetch all Students
    //console.log(course)
    res.status(200).json(material); // Respond with Students data
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Failed to fetch course" });
  }
});



module.exports = router;
