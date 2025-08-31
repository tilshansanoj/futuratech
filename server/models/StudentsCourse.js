const mongoose = require('mongoose');

const StudentsCourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: {type: String ,required: true},
});

module.exports = mongoose.model('studentscourse', StudentsCourseSchema);
