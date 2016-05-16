var mongoose = require('mongoose');

var PetSchema = new mongoose.Schema({
  name:           {type: String, required: true},
  type:           {type: String, required: true},
  breed:          String,
  gender:         String,
  age:            Number,
  bio:            String,
  profilePicture: String
}, {timestamps: true});

module.exports = mongoose.model('Pet', PetSchema);
