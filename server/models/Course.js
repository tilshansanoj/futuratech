const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  course_id:{type: Number, unique: true},
  name: { type: String, required: true },
  duration: { type: String, required: true },
  lecture_name: { type: String, required: true },
  minrequirements: {type: String, required:true},
  notes: {type:String},
  totalfees: {type:String},
  coodinator:{type:String},

});

module.exports = mongoose.model('course', CourseSchema);
