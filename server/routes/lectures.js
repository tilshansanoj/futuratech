const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Lectures = require('../models/Lectures');
const Counter = require('../models/Counter');

// Register
router.post('/register', async (req, res) => {
  
  try {
    console.log(req.body)
    const { name, email,address, 
  officialphone,
  personalphone,
  nic,eduin,experices,highestedu,password } = req.body;
    const existingLectures = await Lectures.findOne({ email });
    if (existingLectures) return res.status(400).json({ message: "Lecture already exists" });

    const counter = await Counter.findByIdAndUpdate(
          "lecture_id",
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );

    const hashedPassword = await bcrypt.hash(password, 10);
    const lectures = new Lectures({ lecture_id: counter.seq,
      name, email,address, 
  officialphone,
  personalphone,
  nic,eduin,experices,highestedu, password: hashedPassword });
    await lectures.save();
    res.status(201).json({ message: "Lecture created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  console.log('✅ /login endpoint hit');
  try {
    const { email, password } = req.body;
    const lectures = await Lectures.findOne({ email });
    if (!lectures) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, lectures.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: lectures._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, lectures: { id: lectures._id, name: lectures.name, email: lectures.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/details", async (req, res) => {
  try {
    const lecture = await Lectures.find(); // Fetch all Students
   // console.log(lecture)
    res.status(200).json(lecture); // Respond with Students data
  } catch (error) {
    console.error("Error fetching lecture:", error);
    res.status(500).json({ error: "Failed to fetch lectures" });
  }
});

router.get("/deta/:id", async (req, res) => {
  
  try {
    const _id=req.params.id;
    const lecture = await Lectures.findOne({ _id }); // Fetch all Students
   // console.log(lecture)
    res.status(200).json(lecture); // Respond with Students data
  } catch (error) {
    console.error("Error fetching lecture:", error);
    res.status(500).json({ error: "Failed to fetch lectures" });
  }
});

// Update lecture
router.put('/update/:id', async (req, res) => {
  console.log('✅ /register endpoint hit');
  try {
    const { id } = req.params; // lecture_id or MongoDB _id
    const {
      name,
      email,
      address,
      officialphone,
      personalphone,
      nic,
      eduin,
      experices,
      highestedu,
    } = req.body;

    // Find the lecture by ID
    const lecture = await Lectures.findOne({ _id: id });
    if (!lecture) {
      console.log("Lecture not found" );
      return res.status(404).json({ message: "Lecture not found" });
    }

    // Update fields only if provided
    if (name) lecture.name = name;
    if (email) lecture.email = email;
    if (address) lecture.address = address;
    if (officialphone) lecture.officialphone = officialphone;
    if (personalphone) lecture.personalphone = personalphone;
    if (nic) lecture.nic = nic;
    if (eduin) lecture.eduin = eduin;
    if (experices) lecture.experices = experices;
    if (highestedu) lecture.highestedu = highestedu;

   

    await lecture.save();

    res.status(200).json({ message: "Lecture updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
