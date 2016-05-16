var express = require('express');
var router = express.Router();

var Pet = require("../models/pet");
/* GET users listing. */

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

router.get('/', authenticate, function(req, res, next) {
  var pets = global.currentUser.pets;
  res.render('pets/index', { pets: pets, message: req.flash() });
});

router.get('/new', authenticate, function(req, res, next) {
  var pet = {
    name: '',
    type: '',
    breed: '',
    gender: '',
    age: '',
    bio: '',
    profilePicture: ''
  };
  res.render('pets/new', { pet: pet });
});

router.get('/:id', authenticate, function(req, res, next) {
  var pet = currentUser.pets.id(req.params.id);
  if (!pet) return next(makeError(res, 'Document ot found', 404));
  res.render('pets/show', { pet: pet, message: req.flash() });
});

router.post('/', authenticate, function(req, res, next) {
  var pet = {
    name: req.body.name,
    type: req.body.type,
    breed: req.body.breed,
    gender: req.body.gender,
    age: req.body.age,
    bio: req.body.bio,
    profilePicture: req.body.profilePicture
  };
  currentUser.pets.push(pet);
  currentUser.save()
    .then(function() {
      res.redirect('/pets');
    }, function(err) {
      return next(err);
    });
});

router.get('/:id/edit', authenticate, function(req, res, next) {
  var pet = currentuser.pets.id(request.params.id);
  if (!pet) return next(makeError(res, 'Document not found', 404));
  res.render('pets/edit', { pet: pet, message: req.flash() });
});

router.put('/:id', authenticate, function(req, res, next) {
  var pet = currentUser.pets.id(req.params.id);
  if (!pet) return next(makeError(res, 'Document not found', 404));
  else {
    pet.name = req.body.name;
    pet.type = req.body.type;
    pet.breed = req.body.breed;
    pet.gender = req.body.gender;
    pet.age = req.body.age;
    pet.bio = req.body.bio;
    pet.profilePicture = req.body.profilePicture;
    currentUser.save()
    .then(function(saved) {
      res.redirect('/pets');
    }, function(err) {
      return next(err)
    });
  }
});

router.delete('/:id', authenticate, function(req,res,next) {
  var pet = currentUser.pets.id(req.params.id);
  if (!pet) return next(makeError(res, 'Document not found', 404));
  var index = currentUser.todos.indexOf(pet);
  currentUser.pets.splice(index, 1);
  currentUser.save()
  .then(function(saved){
   res.redirect('/pets');
 }, function(err) {
  return next(err);
  });
});







module.exports = router;
