var mongoose = require('mongoose');
var Pet = require('./pet');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var PostSchema = new Schema({
  title:          {type: String, required: true},
  text:           {type: String, required: true},
  postPicture:    String,
  purrs:          Array, 
  grrs:           Array,
  pet: {type: Schema.ObjectId, ref: 'Pet'}
}, {timestamps: true});

PostSchema.methods.print = function () {
  return this.title + ": " + this.text + " Pet: " + this.pet.name;
}

module.exports = mongoose.model('Post', PostSchema);
