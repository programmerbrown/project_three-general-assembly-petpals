var express = require('express');
var passport = require('passport');
var session = require('express-session');
var Post = require('../models/post');
var Pet = require('../models/pet');
var Comment = require('../models/comment');
var mongoose = require('mongoose');


var commentsRouter = express.Router();

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

function authenticate(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    next();
  }
}

// CREATE COMMENT
commentsRouter.post('/posts/:id/comment', function(req, res, next) {
  var tempObj = {};
  var commentPetId = req.body.pet;
  var commentText = req.body.commentText;
    var comment = new Comment ({
    pet: commentPetId,
    commentText: commentText
  });
  comment.save()
  .then(function() {
  return Post.findById(req.params.id)
  })
  .then(function(post) {
    post.comments.push(comment);
    return post.save();
  })
  .then(function(savedPost) {
    res.redirect('/posts');
  }, function(err) {
    return next(err);
  });
});


module.exports = commentsRouter;
