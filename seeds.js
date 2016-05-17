var mongoose = require('mongoose');
var User = require('./models/user');
var Pet  = require('./models/pet');
var Post = require('./models/post');

mongoose.connect('mongodb://localhost/petpals');

// our script will not exit until we have disconnected from the db.
function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

// a simple error handler
function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}

console.log('removing old posts...');
Post.remove({})
.then(function(){
  console.log('removing old pets...');
  return Pet.remove({});
})
.then(function() {
  console.log('removing old users...');
  return User.remove({});
})
.then(function() {
  console.log("Now quitting...");
  quit();
});

// console.log('removing old posts...');
// Post.remove({})
// .then(function(){
//   console.log('removing old pets...');
//   return Pet.remove({});
// })
// .then(function() {
//   console.log('old pets removed');
//   console.log('creating some new pets...');
//   var heathcliff = new Pet({ name: 'Heathcliff', type: 'cat', breed: 'junkyard cat'})
//   return heathcliff.save()
// })
// .then(function(savedPet) {
//     console.log("Saved", savedPet.name);
//     var firstPost = new Post({title: "I'm hungry", text: "I haven't eaten in 6 hours.", pet: savedPet._id});
//     console.log("saving post...");
//     return firstPost.save()
//   })
// .then(function(savedFirstPost) {
//   return Post.find({}).populate("pet");
//   })
// .then(function(posts) {
//   console.log("posts: ", posts);
//   return Pet.find({});
// })
// .then(function(pets){
//   console.log("pets: ", pets);
//   quit();
// });

