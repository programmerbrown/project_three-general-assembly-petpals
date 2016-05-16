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
  console.log('old pets removed');
  console.log('creating some new pets...');
  var heathcliff = new Pet({ name: 'Heathcliff', type: 'cat', breed: 'junkyard cat'})
  return heathcliff.save()
})
  // return Pet.create([fluffy, heathcliff]);
.then(function(savedPet) {
    console.log("Saved", savedPet.name);
    // if(err) return handleError(err);
    var firstPost = new Post({title: "I'm hungry", text: "I haven't eaten in 6 hours.", pet: savedPet._id});
    console.log("saving post...");
    return firstPost.save()
  })
.then(function(savedFirstPost) {
  // console.log(Pet.find({}));
  return Post.find({}).populate("pet");
  })
.then(function(posts) {
  console.log("posts: ", posts);
  return Pet.find({});
})
.then(function(pets){
  console.log("pets: ", pets);
  quit();
});


// .then(function(){
//   quit();
// });

// .then(function(allTodos) {
//   console.log('Printing all todos:');
//   allTodos.forEach(function(todo) {
//     console.log(todo);
//   });
//   return Todo.findOne({title: 'groceries'});
// })
// .then(function(groceries) {
//   groceries.completed = true;
//   return groceries.save();
// })
// .then(function(groceries) {
//   console.log('updated groceries:', groceries);
//   return groceries.remove();
// })
// .then(function(deleted) {
//   return Todo.find({});
// })
// .then(function(allTodos) {
//   console.log('Printing all todos:');
//   allTodos.forEach(function(todo) {
//     console.log(todo);
//   });
//   quit();
// });
