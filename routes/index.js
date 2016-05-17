var express = require('express');
var router = express.Router();
var passport = require('passport');
var session = require('express-session');
var User = require('../models/user')

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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('static pages/index', { title: 'PetPals Home' });
});

// INDEX (ALL POSTS)
router.get('/posts', authenticate, function(req, res, next) {
  Posts.find({})
  .then(function(posts) {
    res.render('/posts/index', { posts: posts} );
  });
});

// about page
router.get('/about', function(req, res, next) {
  res.render('static pages/about', {title: 'PetPals About'});
});

// GET /signup
router.get('/signup', function(req, res, next) {
  var user = new User ({
    name: '',
    age: '',
    location: '',
    gender: '',
    picture: ''
  });
  res.render('users/signup', { user: user, message: req.flash() });
});

// POST /signup
router.post('/signup', function(req, res, next) {
  var signUpStrategy = passport.authenticate('local-signup', {
    successRedirect : '../posts',
    failureRedirect : '/signup',
    failureFlash : true
  })
  return signUpStrategy(req, res, next);
});


// GET /login
router.get('/login', function(req, res, next) {
  res.render('users/login', { message: req.flash() });
});

// POST /login
router.post('/login', function(req, res, next) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect : '/pets',
    failureRedirect : 'users/login',
    failureFlash : true
  });
  return loginProperty(req, res, next);
});

// EDIT USER
router.get('/:id/edit', authenticate, function(req, res, next) {
  var user = req.user.id(req.params.id);
  if (!user) return next(makeError(res, 'Document not found', 404));
  res.render('users/edit', { user: user, message: req.flash() });
});

// UPDATE USER
router.put('/:id', authenticate, function(req, res, next) {
  var user = req.user.id(req.params.id);
  if (!user) return next(makeError(res, 'Document not found', 404));
  else {
    user.name = req.body.name;
    user.age = req.body.age;
    user.location = req.body.location;
    user.gender = req.body.gender;
    user.picture = req.body.picture;
    currentUser.save()
    .then(function(saved) {
      res.redirect('/');
    }, function(err) {
      return next(err)
    });
  }
});

// GET /logout
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});


module.exports = router;
