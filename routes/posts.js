var express = require('express');
var Post = require("../models/post");
var Pet = require('../models/pet')
var petsRouter = require('./pets');

var postsRouter = express.Router({mergeParams: true});

petsRouter.use('/:id/posts', postsRouter);


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


// NEW POST
postsRouter.get('/new', authenticate, function(req, res, next) {
  console.log('make a new post');
  var post = {
    title: '',
    text: '',
    postPicture: ''
  };
  res.render('posts/new', { post: post} );
});

// SHOW POST
postsRouter.get('/:id', authenticate, function(req, res, next) {
  var post = pets.id.post(req.params.id);
  if (!pet) return next(makeError(res, 'Document not found', 404));
  res.render("show post");
  // res.render('posts/show', { post: post, message: req.flash() });
});

// CREATE POST
postsRouter.post('/', authenticate, function(req, res, next) {
  var post = {
    title: req.body.title,
    text: req.body.text,
    postPicture: req.body.postPicture
  };
  post.save()
  .then(function() {
  res.redirect('/posts');
}, function(err) {
    return next(err);
  });
});

// EDIT POST
postsRouter.get('/:id/edit', authenticate, function(req, res, next) {
  var post = pets.id.post.id(req.params.id);
  if (!post) return next(makeError(res, 'Document not found', 404));
  res.render('/posts/edit', {post: post, message: req.flash() });
})

postsRouter.put('/:id', authenticate, function(req, res, next) {
  var post = post;
  if (!post) return next(makeError(res, 'Document not found', 404));
  else {
    post.title = req.body.title;
    post.text = req.body.text;
    postPicture = req.body.postPicture;
    post.save()
    .then(function(saved) {
      res.redirect('/pets');
    }, function(err) {
      return next(err)
    });
  }
});

postsRouter.delete('/:id', authenticate, function(req,res,next) {
  // grab post
  var post = pets.id(req.params.id);
  if (!post) return next(makeError(res, 'Document not found', 404));
  pets.id.post.splice(index, 1);
  post.save()
  .then(function(saved){
   res.redirect('/pets');
 }, function(err) {
  return next(err);
  });
});









module.export = postsRouter;
