
// this is the user database schema we store
// user authentication data
var mongoose = require('mongoose')
// import the database
// now take the schema
var Schema = mongoose.Schema;
// import the Schema from mongoose to make the
// user database

// add passport for local use and
// mongoose plugin for the authenticate functionaliry
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  // we are not include username and the password
  // it will be automatically updated by the
  // passport local mngoose plugin

  admin:{
    type:Boolean,
    default:false
  }
});

// we have to add the plugin
User.plugin(passportLocalMongoose);

// now in the authenticate.js which is a middleware we use this
// to authenticate and then plugin this with the UserRouter
// and then add this to main app

module.exports = mongoose.model('Users',User);
