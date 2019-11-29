var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/user');
var bodyParser = require('body-parser');
var passport = require('passport');
var router = express.Router();



//  what we will do
//1) we use the autheticate middleware function
//2) with the middleware return  the req.user object if the user authenticate
//3) we use the userRouter to make two route for the lofin and sign up
//4) we use this so user can create a req.user object in this route
//5) and when the user is created we check the existence of it in the app.js
//6) if we found that req.user is created then we give then next()
//7) so they go to the '/dishes','/promo', and 'leader'
//8) user route will be before the auth function
//9) so user can register and login



// the passport-local-mongoose gives you ability to rgister and authenticate both

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



// now if he just wants to login then  just authenticate with local
// this passport.authenticate() is a middleware
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, status: 'You are successfully logged in!'});
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
