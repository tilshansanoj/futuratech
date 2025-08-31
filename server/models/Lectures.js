const mongoose = require('mongoose');

const LecturesSchema = new mongoose.Schema({
  lecture_id:{type: Number, unique: true},
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: {type:String},
  officialphone: {type:String},
  personalphone: {type:String},
  nic: {type:String},
  eduin: {type:String},
  experices:{type:String},
  highestedu: {type:String,required: true},
  password: { type: String, required: true },
  
 

});

module.exports = mongoose.model('lectures', LecturesSchema);
