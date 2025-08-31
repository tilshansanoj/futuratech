const mongoose = require('mongoose');

const MaterialsSchema = new mongoose.Schema({
  material_id:{type: Number, unique: true},
  name: { type: String, required: true },
  guide: {type:String},
  link_url: {type:String},
  course: {type:String},
  createdAt: { type: String, default: () => new Date().toLocaleString() }
  
 

});

module.exports = mongoose.model('materials', MaterialsSchema);
