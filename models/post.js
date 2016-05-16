var mongoose = require('mongoose');
var Pet = require('./pet');

var PostSchema = new mongoose.Schema({
  title:          {type: String, required: true},
  text:           {type: String, required: true},
  postPicture:    String,
  pet: [{type: Schema.ObjectId, ref: "Pet"}]
}, {timestamps: true});

PostSchema.methods.print = function () {
  return this.title + ": " + this.text + " Pet: " + this.pet.name;
}

module.exports = mongoose.model('Post', PostSchema);
