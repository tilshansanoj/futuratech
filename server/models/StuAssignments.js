const mongoose = require('mongoose');

const StuAssignmentsSchema = new mongoose.Schema({
  submit_id:{type: Number, unique: true},
  name: { type: String, required: true },
  assign_id: {type:String},
  assinname:{type:String},
  link_url: {type:String},
  course: {type:String},
  submitdate:{ type: String, default: () => new Date().toLocaleString() },
  mark:{type: Number,},
  grade:{type:String},
  
 

});

module.exports = mongoose.model('stuassignments', StuAssignmentsSchema);
