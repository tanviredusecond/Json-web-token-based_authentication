// this is a middleware
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//local strategy is used for authenticate in the local way
// like with local database not with facebook Goodle ot any other O auth
var User = require('./models/user');

/**
 
 *  we provide and take the username and password
 * with the help of token
 * we take the token decode then extract the user and password
 * then we authenticate with the jwt (not local) Strategy
 * so we have to write a strategy
 * take and send data as a token then extract and validate with
 * jwt strategy
 * this helps the passport to fetch and send username and passport 
 * with jsonwebtoken by the way validate with the jwt strategy
 */

var config = require('./config');


// now we need the jsonwebtoken 
var jwt = require('jsonwebtoken');
var jwtStrategy = require('passport-jwt').Strategy;
// this tells you the passport to work with jwt
// then when we varify user using passport.authenticate('jwt')
// it will look for the jwtStrategy
// now all you need to know is to write the
//jwt strategy that how it extract and search the databse
var ExtractJwt = require('passport-jwt').ExtractJwt; 
// this is for extractng json webtoken to username and password


/// we export the local authenticate function as a local name function
// so it will not be used unless it is called
// because we will not use it we use jwt
exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// this two line for the the session

// now we need some function 
// we need a functionality to provide the user a token
// after registration this is done by the simple jwt
// and convert the userobject into a token with the secret key
// this is for sending token
exports.getToken = function(user){
    return jwt.sign(user,config.secretKey,{
      expiresIn:36000 })
}


//now its time to take the token with passport and 
// then decrypt them
// and search the database
// this is the strategy function that will be used
// by the passport.authenticate('jwt') function
// we do not call the function directly
// first to do that we need to se some options 
// so make a empty json and then fill them
// we give the option that how the token will
// be extracted and from which position
// we take it from the header
// and the secret key too
var opts = {};
opts.jstFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken;
opts.secretOrKey = config.secretKey;

// we export a function to extract and decode this with 
// thease options with passport that is known as jwtStrategy[see the import variable name]
//this jwtStrategy will take the opts as a parameter
// and then after the decode it will give us the payload
// and error in a  callback function
// now remeber this will return a user from the payload

// this function will decode and find the database for user with
// the id
exports.jwtPassport = passport.use(new jwtStrategy(opts,(jwt_payload,done)=>{
    console.log("JWT PAYLOAD ",jwt_payload);
    // this payload has a id so search the user with the id
    User.findOne({_id:jwt_payload._id},(err,user)=>{
        if(err){
            return done(err,false);

        }else if (user){
            return done(false,user);
        }
        else{
            return done(err,false);
        }
    })
}));

// now we export the varify function that is used
// to verify data from the strategy that we create
// this is the syntax if we give jwt than the authenticate will
// use the jwtpassport function as a strategy
//exports.verifyUser - passport.authenticate('<strategy>',{session:false})

exports.verifyUser =  passport.authenticate('jwt',{session:false});
// and we dont create any session
// now go to the userRouter and execute this function that you just created