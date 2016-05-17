var express = require('express');
var petsRouter = express.Router();
var Pet = require("../models/pet");


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

// INDEX CURRENT USER PETS
petsRouter.get('/', authenticate, function(req, res, next) {
  var pets = global.currentUser.pets;
  res.render('pets/index', { pets: pets, message: req.flash() });
});

// NEW PET
petsRouter.get('/new', authenticate, function(req, res, next) {
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

// SHOW PET
petsRouter.get('/:id', authenticate, function(req, res, next) {
  var pet = currentUser.pets.id(req.params.id);
  if (!pet) return next(makeError(res, 'Document not found', 404));
  res.render('pets/show', { pet: pet, message: req.flash() });
});


// CREATE
petsRouter.post('/', authenticate, function(req, res, next) {
  console.log("made it to the pets create route");

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
    .then(function(saved) {
      res.redirect('/pets');
    }, function(err) {
      return next(err);
    });
});

// EDIT PET
petsRouter.get('/:id/edit', authenticate, function(req, res, next) {
  var pet = currentUser.pets.id(req.params.id);
  if (!pet) return next(makeError(res, 'Document not found', 404));
  res.render('pets/edit', { pet: pet, message: req.flash() });
});

// UPDATE PET
petsRouter.put('/:id', authenticate, function(req, res, next) {
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
// DESTROY
petsRouter.delete('/:id', authenticate, function(req, res, next) {

  var pet = currentUser.pets.id(req.params.id);
  if (!pet) return next(makeError(res, 'Document not found', 404));
  var index = currentUser.pets.indexOf(pet);
  currentUser.pets.splice(index, 1);
  currentUser.save()
    .then(function(saved) {
      res.redirect('/pets');
    }, function(err) {
      return next(err);
    });
});


module.exports = petsRouter;


