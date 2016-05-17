var express = require('express');
var router = express.Router();

var Post = require("../models/post");
var Pet = require('..models/pet')

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
};

function authenticate(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    next();
  }
};

// INDEX (ALL POSTS)
router.get('/posts', authenticate, function(req, res, next) {
  Posts.find({})
  .then(function(posts) {
    res.render('/posts/index', { posts: posts} );
  });
});

// NEW POST
router.get('/pets/:id/posts/new', authenticate, function(req, res, next) {
  var post = {
    title: '',
    text: '',
    postPicture: ''
  };
  res.render('/pets/:id/posts/new', { post: post} );
});


// // SHOW POST
// router.get('pets/:id/post/:id', authenticate, function(req, res, next) {
//   Pet.findOne()
//   var post =
// })









module.export = router;
