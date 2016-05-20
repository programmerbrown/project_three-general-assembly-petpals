var mongoose = require('mongoose');
var Pet = require('./pet');
var Comment = require('./comment');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var PostSchema = new Schema({
  title:          {type: String, required: true},
  text:           {type: String, required: true},
  pet: {type: Schema.ObjectId, ref: 'Pet'},
  comments:       [Comment.schema],
  postPicture:    String,
  purrs:          Array,
  grrs:           Array,
}, {timestamps: true}
);


module.exports = mongoose.model('Post', PostSchema);
