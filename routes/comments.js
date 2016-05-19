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

// POST COMMENT
commentsRouter.post('/posts/:id/comment', function(req, res, next) {
  console.log("hit comment route");
  console.log('req.body:', req.body);
  var commentPetId = req.body.pet;
  console.log('commentPetId:', commentPetId);
  var commentText = req.body.commentText;
  console.log('commentText:', commentText);
  console.log('finding post with id:', req.params.id);
  Post.findById(req.params.id)
  .then(function(post) {
    console.log('post:', post);
    var comment = {
      pet: commentPetId,
      commentText: commentText
    };
    console.log('about to push comment:', comment);
    post.comments.push(comment);
    console.log('about to save post:', post);
    return post.save();
  })
  .then(function(savedPost) {
    console.log('savedPost:', savedPost);
    res.redirect('/posts');
  }, function(err) {
    return next(err);
  });
});



module.exports = commentsRouter;
