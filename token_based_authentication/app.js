var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

// this is the basic import tof all the module

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRouter');

// all the rest module goes here

const dishrouter = require('./routes/dishRouter');
const promorouter = require('./routes/promoRouter');
const leaderrouter = require('./routes/leaderRouter');
//const usersRouter = require('./routes/usersRouter');
const Dishes = require('./models/dishes');
const Promotions = require('./models/promotions');
const Leaders = require('./models/leaders');
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');

// all the import goes here
// we try to store the session information
// to the mongodb database


// database goes here
// database parameter
const url = config.mongoUrl;
const connect  = mongoose.connect(url);
connect.then((db)=>{
  console.log("Connected to the database");
})
// database ends here


var app = express();
app.use(passport.initialize());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var session  = require('express-session');
var FileStore = require('session-file-store')(session);




app.use('/', indexRouter);
app.use('/users', usersRouter);





// we dont use the authentication function here
// because we already made a verifyUser middleware
// we just add it to the route as a middleware


app.use('/dishes',authenticate.verifyUser,dishrouter);
app.use('/promotions',authenticate.verifyUser,promorouter);
app.use('/leaders',authenticate.verifyUser,leaderrouter);

// now this is how we do work now
// user have to be registered to do to the dishes promo and the leader
// but you can apply to individual request too


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
