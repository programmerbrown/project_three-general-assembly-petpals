var mongoose = require('mongoose');
var Post = require('./post');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var PetSchema = new Schema({
  name:           {type: String, required: true},
  type:           {type: String, required: true},
  breed:          String,
  gender:         String,
  age:            Number,
  bio:            String,
  profilePicture: String,
  // posts:           [{type: Schema.ObjectId, ref: "Post"}]
}, {timestamps: true});

module.exports = mongoose.model('Pet', PetSchema);
