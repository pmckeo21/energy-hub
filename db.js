
//lets require/import the mongodb native drivers.
//var mongodb = require('mongodb');
var mongoose = require('mongoose');

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost/passport';

// Connect to DB


// Use connect method to connect to the Server
mongoose.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);
  }
});