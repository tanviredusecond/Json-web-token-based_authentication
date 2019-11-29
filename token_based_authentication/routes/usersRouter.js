var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/user');
var bodyParser = require('body-parser');
var passport = require('passport');
var router = express.Router();
var authenticate = require('../authenticate');




router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}),
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    }
  });
});




/**
 *  now for login we need to make the token
 * so see we already authenticate using the local
 * so now just give them a token
 * now you can ask where is the jwt strategy 
 * we are using the local strategy here
 * remember we make the token in the login
 * then we send the token with the request to
 * like to dishes url or other url
 * then we use the verify funtion to decode and find user
 * so it will be a middleware for to access the url
 * 
 * make token here and when you go for dishes for a post
 * request with the token you will pass through a 
 * middle ware verifyUser that you created with jwt strategy
 * and then if you pass you will just ket then go
 * go to the dishes post request and see how we use the
 * verify users to extract and find user and then let go to the url
 * as a middleware
 * we contoll the route with verify user
 * 
 */



router.post('/login', passport.authenticate('local'), (req, res) => {
  var token = authenticate.getToken({_id:req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true,token:token, status: 'You are successfully logged in!'});
});


// now if the res.user is created then we pass the user to the
// dishes leader and promo




// logout process starts here
router.get('/logout',(req,res)=>{
  if(req.session){
    req.session.destroy(); // destroy the sessions
    // now lets the cookies be removed
    res.clearCookie('session-id');
    // sending back to the home page
    res.redirect('/');
  }else{
    // if there is no session is already there
    var err = new Error('You are not even logged in');
    err.status = 403;
    next(err);
  }
});

router.get('/getalltheusers',(req,res,next)=>{
    User.find({}).then((users)=>{
      res.statusCode = 200;
      res.setHeader('Content-Type','text/json');
      res.json(users);
    })
});


module.exports = router;
