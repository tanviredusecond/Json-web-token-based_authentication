

// this is a middleware

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//local strategy is used for authenticate in the local way
// like with local database not with facebook Goodle ot any other O auth
var User = require('./models/user');

//we use the passport and then give the local strategy and then authenticate
// function
// this function will be model auth function
// if you want you can use the custom function

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// this two line for the the session

// now this authenticate is used by the UserRouter.
