const mongoose = require('mongoose');

const AssignmentsSchema = new mongoose.Schema({
  assignment_id:{type: Number, unique: true},
  name: { type: String, required: true },
  guide: {type:String},
  link_url: {type:String},
  course: {type:String},
  lastdate:{type:String},
  
 

});

module.exports = mongoose.model('assignments', AssignmentsSchema);
