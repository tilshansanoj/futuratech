const mongoose = require('mongoose');

const StudentsSchema = new mongoose.Schema({
  student_id:{type: Number, unique: true},
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: {type:String},
  phone: {type:String},
  nic: {type:String},
  citizenship: {type:String},
  course: {type: String ,required: true},
  highestedu: {type:String,required: true},
  password: { type: String, required: true },
});

module.exports = mongoose.model('students', StudentsSchema);
