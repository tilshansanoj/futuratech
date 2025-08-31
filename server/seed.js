const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Courses= require('./models/Course');
const Lecturer =require('./models/Lectures');
const Counter =require('./models/Counter');
const Students = require('./models/Students');
const Assignments = require('./models/Assignments');
const StudentsCourse=require('./models/StudentsCourse');
const Materials = require('./models/Materials');
const StuAssignments=require('./models/StuAssignments');

dotenv.config();

// Sample data for seeding

const users = [
  { name: 'admin',email: 'admin', password: '$2b$10$4Eh8YIOE7Wl/WAi46doi6.cMhQdCraLuVl3qS9k.keVEMh9t9eNaa' },//futura@123
];

const courses_list = [
  {
    course_id: 1,
    name: "Computer Science Fundamentals",
    duration: "6 Months",
    lecture_name: "Dr. Ruwan Perera",
    minrequirements: "Passed A/L",
    notes: "Intro to algorithms, data structures, and programming basics.",
    totalfees: "45000",
    coodinator: "Prof. Kamal Silva"
  },
  {
    course_id: 2,
    name: "Advanced Database Systems",
    duration: "4 Months",
    lecture_name: "Ms. Anushka Fernando",
    minrequirements: "Bachelor Degree",
    notes: "Covers SQL, NoSQL, and distributed databases.",
    totalfees: "60000",
    coodinator: "Dr. Nishan Jayawardena"
  },
  {
    course_id: 3,
    name: "Artificial Intelligence",
    duration: "8 Months",
    lecture_name: "Dr. Priyanka Jayasuriya",
    minrequirements: "Master",
    notes: "Machine learning, deep learning, and real-world AI applications.",
    totalfees: "120000",
    coodinator: "Dr. Ruwan Gunasekara"
  },
  {
    course_id: 4,
    name: "Web Development Bootcamp",
    duration: "5 Months",
    lecture_name: "Mr. Dilshan Ranasinghe",
    minrequirements: "Passed O/L",
    notes: "Full stack development with React, Node.js, and MongoDB.",
    totalfees: "55000",
    coodinator: "Ms. Nadeesha Karunaratne"
  },
  {
    course_id: 5,
    name: "Business Management Essentials",
    duration: "3 Months",
    lecture_name: "Prof. Manjula Abeysekara",
    minrequirements: "Bachelor Degree",
    notes: "Management theories, case studies, and leadership training.",
    totalfees: "40000",
    coodinator: "Dr. Chandana Fernando"
  },
  {
    course_id: 6,
    name: "Cyber Security and Ethical Hacking",
    duration: "6 Months",
    lecture_name: "Mr. Malith Weerasinghe",
    minrequirements: "Bachelor Degree",
    notes: "Network security, penetration testing, and cyber laws.",
    totalfees: "85000",
    coodinator: "Dr. Heshan Ekanayake"
  },
  {
    course_id: 7,
    name: "Data Science and Analytics",
    duration: "7 Months",
    lecture_name: "Dr. Savithri Rajapaksha",
    minrequirements: "Master",
    notes: "Data visualization, predictive modeling, and Python for data science.",
    totalfees: "100000",
    coodinator: "Dr. Anura Wijeratne"
  },
  {
    course_id: 8,
    name: "Digital Marketing Strategies",
    duration: "4 Months",
    lecture_name: "Ms. Gayani Wickramasinghe",
    minrequirements: "Passed A/L",
    notes: "SEO, SEM, social media campaigns, and analytics.",
    totalfees: "35000",
    coodinator: "Mr. Nuwan Senanayake"
  },
  {
    course_id: 9,
    name: "Electrical Engineering Basics",
    duration: "6 Months",
    lecture_name: "Prof. Ranjan Amarasinghe",
    minrequirements: "Bachelor Degree",
    notes: "Circuits, electronics, and energy systems.",
    totalfees: "70000",
    coodinator: "Dr. Harsha Dissanayake"
  },
  {
    course_id: 10,
    name: "Philosophy and Critical Thinking",
    duration: "3 Months",
    lecture_name: "Dr. Dilan Jayawardena",
    minrequirements: "PhD",
    notes: "Philosophical reasoning and modern thought analysis.",
    totalfees: "30000",
    coodinator: "Prof. Shalika Gunawardena"
  }
];

const lecture_list=[
  {
    lecture_id:1,
    name:"Dr. Ruwan Perera",
    email:"ruwan@g.c",
    address:"Welihma, Kegalle",
    officialphone:"0712669962",
    personalphone:"0712558963",
    nic:"199125852581",
    eduin:"in AI",
    experices:"Work with AI",
    highestedu:"Master",
    password:"$2b$10$Prq9aywCQbNCdZXY1LYcBO69jFJrDm85QGPdk.7CEnaB53jUH5gEi"
},
 {
    lecture_id:2,
    name:"Ms. Anushka Fernando",
    email:"anu@g.c",
    address:"Welihma, Kegalle",
    officialphone:"0712669962",
    personalphone:"0712558963",
    nic:"199125852581",
    eduin:"in AI",
    experices:"Work with AI",
    highestedu:"Master",
    password:"$2b$10$Prq9aywCQbNCdZXY1LYcBO69jFJrDm85QGPdk.7CEnaB53jUH5gEi"
},
 {
    lecture_id:3,
    name:"Dr. Priyanka Jayasuriya",
    email:"priya@g.c",
    address:"Welihma, Kegalle",
    officialphone:"0712669962",
    personalphone:"0712558963",
    nic:"199125852581",
    eduin:"in AI",
    experices:"Work with AI",
    highestedu:"Master",
    password:"$2b$10$Prq9aywCQbNCdZXY1LYcBO69jFJrDm85QGPdk.7CEnaB53jUH5gEi"
},
 {
    lecture_id:4,
    name:"Mr. Dilshan Ranasinghe",
    email:"dil@g.c",
    address:"Welihma, Kegalle",
    officialphone:"0712669962",
    personalphone:"0712558963",
    nic:"199125852581",
    eduin:"in AI",
    experices:"Work with AI",
    highestedu:"Master",
    password:"$2b$10$Prq9aywCQbNCdZXY1LYcBO69jFJrDm85QGPdk.7CEnaB53jUH5gEi"
},
 {
    lecture_id:5,
    name:"Prof. Manjula Abeysekara",
    email:"manjula@g.c",
    address:"Welihma, Kegalle",
    officialphone:"0712669962",
    personalphone:"0712558963",
    nic:"199125852581",
    eduin:"in AI",
    experices:"Work with AI",
    highestedu:"Master",
    password:"$2b$10$Prq9aywCQbNCdZXY1LYcBO69jFJrDm85QGPdk.7CEnaB53jUH5gEi"
},
 {
    lecture_id:6,
    name:"Mr. Malith Weerasinghe",
    email:"malith@g.c",
    address:"Welihma, Kegalle",
    officialphone:"0712669962",
    personalphone:"0712558963",
    nic:"199125852581",
    eduin:"in AI",
    experices:"Work with AI",
    highestedu:"Master",
    password:"$2b$10$Prq9aywCQbNCdZXY1LYcBO69jFJrDm85QGPdk.7CEnaB53jUH5gEi"
},
 {
    lecture_id:7,
    name:"Dr. Savithri Rajapaksha",
    email:"savi@g.c",
    address:"Welihma, Kegalle",
    officialphone:"0712669962",
    personalphone:"0712558963",
    nic:"199125852581",
    eduin:"in AI",
    experices:"Work with AI",
    highestedu:"Master",
    password:"$2b$10$Prq9aywCQbNCdZXY1LYcBO69jFJrDm85QGPdk.7CEnaB53jUH5gEi"
},
 {
    lecture_id:8,
    name:"Ms. Gayani Wickramasinghe",
    email:"gayani@g.c",
    address:"Welihma, Kegalle",
    officialphone:"0712669962",
    personalphone:"0712558963",
    nic:"199125852581",
    eduin:"in AI",
    experices:"Work with AI",
    highestedu:"Master",
    password:"$2b$10$Prq9aywCQbNCdZXY1LYcBO69jFJrDm85QGPdk.7CEnaB53jUH5gEi"
},
 {
    lecture_id:9,
    name:"Prof. Ranjan Amarasinghe",
    email:"ranjan@g.c",
    address:"Welihma, Kegalle",
    officialphone:"0712669962",
    personalphone:"0712558963",
    nic:"199125852581",
    eduin:"in AI",
    experices:"Work with AI",
    highestedu:"Master",
    password:"$2b$10$Prq9aywCQbNCdZXY1LYcBO69jFJrDm85QGPdk.7CEnaB53jUH5gEi"
},
 {
    lecture_id:10,
    name:"Dr. Dilan Jayawardena",
    email:"dilJ@g.c",
    address:"Welihma, Kegalle",
    officialphone:"0712669962",
    personalphone:"0712558963",
    nic:"199125852581",
    eduin:"in AI",
    experices:"Work with AI",
    highestedu:"Master",
    password:"$2b$10$Prq9aywCQbNCdZXY1LYcBO69jFJrDm85QGPdk.7CEnaB53jUH5gEi"
}
];

const students=[
  
  {
    student_id: 1,
    name: "Dilan Jayawardena",
    email: "dilann@gmail.com",
    address: "Flower Rd, Welimada",
    phone: "0712400336",
    nic: "199181402428",
    citizenship: "Sri Lankan",
    course: "Computer Science Fundamentals",
    highestedu: "Master",
    password: "$2b$10$gLxvMwymFQvDvqc3YCkfGOofa/XXOH7BPAzLlaiIX9xzhJ1N0vvLu"
  },
  {
    student_id: 2,
    name: "Kavindu Perera",
    email: "kavindu.p@gmail.com",
    address: "Main St, Kandy",
    phone: "0711234567",
    nic: "199456789012",
    citizenship: "Sri Lankan",
    course: "Artificial Intelligence",
    highestedu: "Bachelor Degree",
    password: "$2b$10$gLxvMwymFQvDvqc3YCkfGOofa/XXOH7BPAzLlaiIX9xzhJ1N0vvLu"
  },
  {
    student_id: 3,
    name: "Nadeesha Silva",
    email: "nadee.silva@gmail.com",
    address: "Lake Rd, Kurunegala",
    phone: "0779876543",
    nic: "199987654321",
    citizenship: "Sri Lankan",
    course: "Web Development Bootcamp",
    highestedu: "Passed A/L",
    password: "$2b$10$gLxvMwymFQvDvqc3YCkfGOofa/XXOH7BPAzLlaiIX9xzhJ1N0vvLu"
  },
  {
    student_id: 4,
    name: "Sanduni Fernando",
    email: "sanduni.f@gmail.com",
    address: "Temple Rd, Galle",
    phone: "0764567890",
    nic: "199556789012",
    citizenship: "Sri Lankan",
    course: "Business Management Essentials",
    highestedu: "Passed O/L",
    password: "$2b$10$gLxvMwymFQvDvqc3YCkfGOofa/XXOH7BPAzLlaiIX9xzhJ1N0vvLu"
  },
  {
    student_id: 5,
    name: "Chamod Abeysekara",
    email: "chamod.a@gmail.com",
    address: "Railway Rd, Matara",
    phone: "0717654321",
    nic: "199334567890",
    citizenship: "Sri Lankan",
    course: "Advanced Database Systems",
    highestedu: "Master",
    password: "$2b$10$gLxvMwymFQvDvqc3YCkfGOofa/XXOH7BPAzLlaiIX9xzhJ1N0vvLu"
  },
  {
    student_id: 6,
    name: "Ishara Weerasinghe",
    email: "ishara.w@gmail.com",
    address: "Park Rd, Colombo",
    phone: "0701122334",
    nic: "199623456789",
    citizenship: "Sri Lankan",
    course: "Computer Science Fundamentals",
    highestedu: "Passed A/L",
    password: "$2b$10$gLxvMwymFQvDvqc3YCkfGOofa/XXOH7BPAzLlaiIX9xzhJ1N0vvLu"
  },
  {
    student_id: 7,
    name: "Ravindu Gunawardena",
    email: "ravindu.g@gmail.com",
    address: "Hill St, Badulla",
    phone: "0723344556",
    nic: "199812345678",
    citizenship: "Sri Lankan",
    course: "Artificial Intelligence",
    highestedu: "Bachelor Degree",
    password: "$2b$10$gLxvMwymFQvDvqc3YCkfGOofa/XXOH7BPAzLlaiIX9xzhJ1N0vvLu"
  },
  {
    student_id: 8,
    name: "Dinithi Jayasuriya",
    email: "dinithi.j@gmail.com",
    address: "Highway Rd, Negombo",
    phone: "0789988776",
    nic: "199112233445",
    citizenship: "Sri Lankan",
    course: "Web Development Bootcamp",
    highestedu: "Passed O/L",
    password: "$2b$10$gLxvMwymFQvDvqc3YCkfGOofa/XXOH7BPAzLlaiIX9xzhJ1N0vvLu"
  },
  {
    student_id: 9,
    name: "Mihiri Ratnayake",
    email: "mihiri.r@gmail.com",
    address: "Ocean View, Trincomalee",
    phone: "0756677889",
    nic: "199778899001",
    citizenship: "Sri Lankan",
    course: "Business Management Essentials",
    highestedu: "Master",
    password: "$2b$10$gLxvMwymFQvDvqc3YCkfGOofa/XXOH7BPAzLlaiIX9xzhJ1N0vvLu"
  },
  {
    student_id: 10,
    name: "Tharindu Kariyawasam",
    email: "tharindu.k@gmail.com",
    address: "Main Rd, Anuradhapura",
    phone: "0712233445",
    nic: "199667788990",
    citizenship: "Sri Lankan",
    course: "Advanced Database Systems",
    highestedu: "Bachelor Degree",
    password: "$2b$10$gLxvMwymFQvDvqc3YCkfGOofa/XXOH7BPAzLlaiIX9xzhJ1N0vvLu"
  },
  {
    student_id: 11,
    name: "Shehani Dias",
    email: "shehani.d@gmail.com",
    address: "Beach Rd, Hambantota",
    phone: "0767788990",
    nic: "199445566778",
    citizenship: "Sri Lankan",
    course: "Artificial Intelligence",
    highestedu: "Passed O/L",
    password: "$2b$10$gLxvMwymFQvDvqc3YCkfGOofa/XXOH7BPAzLlaiIX9xzhJ1N0vvLu"
  },
  {
    student_id: 12,
    name: "Ashen Liyanage",
    email: "ashen.l@gmail.com",
    address: "Station Rd, Ratnapura",
    phone: "0773344556",
    nic: "199334455667",
    citizenship: "Sri Lankan",
    course: "Computer Science Fundamentals",
    highestedu: "Passed A/L",
    password: "$2b$10$gLxvMwymFQvDvqc3YCkfGOofa/XXOH7BPAzLlaiIX9xzhJ1N0vvLu"
  },
  {
    student_id: 13,
    name: "Gayani Hettiarachchi",
    email: "gayani.h@gmail.com",
    address: "Central Rd, Polonnaruwa",
    phone: "0744455667",
    nic: "199223344556",
    citizenship: "Sri Lankan",
    course: "Business Management Essentials",
    highestedu: "Bachelor Degree",
    password: "$2b$10$gLxvMwymFQvDvqc3YCkfGOofa/XXOH7BPAzLlaiIX9xzhJ1N0vvLu"
  },
  {
    student_id: 14,
    name: "Nirmal Bandara",
    email: "nirmal.b@gmail.com",
    address: "Green Park, Nuwara Eliya",
    phone: "0709988776",
    nic: "199889900112",
    citizenship: "Sri Lankan",
    course: "Web Development Bootcamp",
    highestedu: "Master",
    password: "$2b$10$gLxvMwymFQvDvqc3YCkfGOofa/XXOH7BPAzLlaiIX9xzhJ1N0vvLu"
  },
  {
    student_id: 15,
    name: "Thisuri Wickramasinghe",
    email: "thisuri.w@gmail.com",
    address: "Palm Grove, Jaffna",
    phone: "0718899001",
    nic: "199667700112",
    citizenship: "Sri Lankan",
    course: "Advanced Database Systems",
    highestedu: "Passed O/L",
    password: "$2b$10$gLxvMwymFQvDvqc3YCkfGOofa/XXOH7BPAzLlaiIX9xzhJ1N0vvLu"
  },

]

const coursestudents=[
  {
  name: "Dilan Jayawardena",
  course: "Computer Science Fundamentals"
},
 {
  name: "Dilan Jayawardena",
  course: "Advanced Database Systems"
},
 {
  name: "Kavindu Perera",
  course: "Artificial Intelligence"
},
 {
  name: "Nadeesha Silva",
  course: "Web Development Bootcamp"
},
 {
  name: "Sanduni Fernando",
  course: "Business Management Essentials"
},
 {
  name: "Chamod Abeysekara",
  course: "Advanced Database Systems"
},
 {
  name: "Ishara Weerasinghe",
  course: "Computer Science Fundamentals"
},
 {
  name: "Ravindu Gunawardena",
  course: "Artificial Intelligence"
},
 {
  name: "Dinithi Jayasuriya",
  course: "Web Development Bootcamp"
},
 {
  name: "Mihiri Ratnayake",
  course: "Business Management Essentials"
},

 {
  name: "Tharindu Kariyawasam",
  course: "Advanced Database Systems"
},
 {
  name: "Shehani Dias",
  course: "Artificial Intelligence"
},
 {
  name: "Ashen Liyanage",
  course: "Computer Science Fundamentals"
},
 {
  name: "Gayani Hettiarachchi",
  course: "Business Management Essentials"
},
 {
  name: "Nirmal Bandara",
  course: "Web Development Bootcamp"
},
 {
  name: "Thisuri Wickramasinghe",
  course: "Advanced Database Systems"
},

 {
  name: "Thisuri Wickramasinghe",
  course: "Computer Science Fundamentals"
},
 {
  name: "Tharindu Kariyawasam",
  course: "Computer Science Fundamentals"
},
 {
  name: "Shehani Dias",
  course: "Computer Science Fundamentals"
},
 {
  name: "Dinithi Jayasuriya",
  course: "Computer Science Fundamentals"
},
]

const material=[
  {
  material_id: 1,
  name: "Lec note 1",
  guide: "Introduction to Computer Systems",
  link_url: "3333.pdf",
  course: "Computer Science Fundamentals",
  },
  {
  material_id: 2,
  name: "Lec note 2",
  guide: "Data Structures and Algorithms",
  link_url: "3333.pdf",
  course: "Computer Science Fundamentals",
  },
  {
  material_id: 3,
  name: "Lec note 3",
  guide: "Programming Fundamentals",
  link_url: "3333.pdf",
  course: "Computer Science Fundamentals",
  },
  {
  material_id: 4,
  name: "Lec note 4",
  guide: "Computer Networks",
  link_url: "3333.pdf",
  course: "Computer Science Fundamentals",
  },
  {
  material_id: 5,
  name: "Lec note 5",
  guide: "Software Engineering Principles",
  link_url: "3333.pdf",
  course: "Computer Science Fundamentals",
  },
  {
  material_id: 6,
  name: "Lec note 1",
  guide: "Distributed Databases and Query Processing",
  link_url: "3333.pdf",
  course: "Advanced Database Systems",
  },
  {
  material_id: 7,
  name: "Lec note 2",
  guide: "NoSQL and New Data Models",
  link_url: "3333.pdf",
  course: "Advanced Database Systems",
  },
  {
  material_id: 8,
  name: "Lec note 3",
  guide: "Database Security and Transactions",
  link_url: "3333.pdf",
  course: "Advanced Database Systems",
  },
   {
  material_id: 9,
  name: "Lec note 1",
  guide: "Search and Problem Solving",
  link_url: "3333.pdf",
  course: "Artificial Intelligence",
  },
   {
  material_id: 10,
  name: "Lec note 2",
  guide: "Machine Learning Basics",
  link_url: "3333.pdf",
  course: "Artificial Intelligence",
  },
   {
  material_id: 11,
  name: "Lec note 3",
  guide: "Natural Language Processing",
  link_url: "3333.pdf",
  course: "Artificial Intelligence",
  },
   {
  material_id: 12,
  name: "Lec note 1",
  guide: "Web Development with cms",
  link_url: "3333.pdf",
  course: "Web Development Bootcamp",
  },
    {
  material_id: 13,
  name: "Lec note 1",
  guide: "What is Business Management",
  link_url: "3333.pdf",
  course: "Business Management Essentials",
  },
]

const assignment=[
  {
  "assignment_id": 1,
  "name": "Assignment 1 CS",
  "guide": "Implementation and Analysis of Sorting Algorithms: Comparing Bubble Sort, Merge Sort, and Quick Sort",
  "link_url": "2222.pdf",
  "course": "Computer Science Fundamentals",
  "lastdate": "2025-09-26",
  
  },
  {
  "assignment_id": 2,
  "name": "Assignment 2 CS",
  "guide": "Designing a Simple Student Record Management System using Data Structures",
  "link_url": "2222.pdf",
  "course": "Computer Science Fundamentals",
  "lastdate": "2025-10-06",
  
  },
  {
  "assignment_id": 3,
  "name": "Assignment 3 CS",
  "guide": "Write Introduction to AI, machine learning basics, and real-world applications.",
  "link_url": "2222.pdf",
  "course": "Computer Science Fundamentals",
  "lastdate": "2025-10-14",
  
  },
  {
  "assignment_id": 4,
  "name": "Assignment 1 - Advanced Database Systems",
  "guide": "Design and Implement a Distributed Database for an Online Retail System",
  "link_url": "2222.pdf",
  "course": "Advanced Database Systems",
  "lastdate": "2025-10-02",
  
  },
  {
  "assignment_id": 5,
  "name": "Assignment 1 - AI",
  "guide": "Develop an A Search Algorithm to Solve a Pathfinding Problem.",
  "link_url": "2222.pdf",
  "course": "Artificial Intelligence",
  "lastdate": "2025-09-26",
  
  },
]


const count=[
  {
    _id:"student_id",
    seq:15,
},
 {
    _id:"lecture_id",
    seq:10,
},
 {
    _id:"course_id",
    seq:10,
},
{
    _id:"material_id",
    seq:13,
},
{
  _id:"assignment_id",
  seq:5,
},
{
  _id:"submit_id",
  seq:5,
}
]

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 50, 
            minPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000
        });
        console.log('Connected to MongoDB successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};

// Seed data function
const seedData = async () => {
    try {
        await connectDB();
        
        // Clear existing data
        await User.deleteMany({});
        await Courses.deleteMany({});
        await Lecturer.deleteMany({});
        await Counter.deleteMany({});
        await Students.deleteMany({});
        await StudentsCourse.deleteMany({});
        await Materials.deleteMany({});
        await Assignments.deleteMany({});
        
        console.log('Cleared existing data');
        
        // Insert new data
        await User.insertMany(users);
        console.log('Users seeded');
        
        await Courses.insertMany(courses_list);
        console.log('Courses seeded');
        
        await Lecturer.insertMany(lecture_list);
        console.log('Lecturers seeded');
        
        await Counter.insertMany(count);
        console.log('Counters seeded');
        
        await Students.insertMany(students);
        console.log('Students seeded');
        
        await StudentsCourse.insertMany(coursestudents);
        console.log('Student courses seeded');
        
        await Materials.insertMany(material);
        console.log('Materials seeded');
        
        await Assignments.insertMany(assignment);
        console.log('Assignments seeded');
        
        console.log('All data seeded successfully!');
        
    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        // Close connection only once after all operations
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
            console.log('MongoDB connection closed');
        }
    }
};

// Execute the seeding
seedData();