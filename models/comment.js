var mongoose = require('mongoose');
var Post = require('./post');
var Pet = require('./pet');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CommentSchema = new Schema ({
  pet: {type: Scehma.ObjectId, ref:"Pet"},
  post: {type:Schema.ObjectId, ref:"Post"},
  commentText: String,
  },
  {timestamps: true}
);

module.exports = mongoose.model('Comment', CommentSchema);
