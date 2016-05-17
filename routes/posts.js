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
  var post = new Post ({
    title: '',
    text: '',
    postPicture: ''
  });
  res.render('posts/new', { post: post, id: req.params.id } );
});

// SHOW POST
postsRouter.get('/:id', authenticate, function(req, res, next) {
  var post = pets.id.post(req.params.id);
  if (!pet) return next(makeError(res, 'Document not found', 404));
  res.render('posts/show', { post: post, message: req.flash() });
});

// CREATE POST
postsRouter.post('/', authenticate, function(req, res, next) {
  var post = new Post ({
    title: req.body.title,
    text: req.body.text,
    postPicture: req.body.postPicture,
    pet: req.params.id
  });
  console.log("We're saving this post");
  post.save()
  .then(function() {
  console.log("Saved, and we're redirecting")
  res.redirect('/pets');
}, function(err) {
    return next(err);
  });
});

// EDIT POST
postsRouter.get('/:id/edit', authenticate, function(req, res, next) {
  console.log("Made it to the EDIT route");
  return Post.findOne({ _id: req.params.id })
  .then(function(postReturned) {
    console.log("Found a post and here it is.");
    console.log(postReturned);
    res.render('posts/edit', {post: postReturned, id: req.params.id, message: req.flash() });
  });
  // .then(function())
  // // var post = pets.id.post.id(req.params.id);
  // if (!post) return next(makeError(res, 'Document not found', 404));
  // res.render('/posts/edit', {post: post, message: req.flash() });
});

// UPDATE POST
postsRouter.put('/:id', authenticate, function(req, res, next) {
  // var post = post;
  return Post.findOne({ _id: req.params.id })
  .then(function(post) {
    if (!post) {
      console.log("The UPDATE route is dying.");
      return next(makeError(res, 'Document not found', 404));
    } else {
      console.log("The UPDATE route is alive and we are updating the post.");
      post.title = req.body.title;
      post.text = req.body.text;
      post.postPicture = req.body.postPicture;
      return post.save()
    }
  })
  .then(function(saved) {
        res.redirect('/pets');
      }, function(err) {
        return next(err)
  });
});

// DESTROY POST
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
