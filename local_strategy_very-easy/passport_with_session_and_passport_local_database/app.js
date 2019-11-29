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

// all the import goes here
// we try to store the session information
// to the mongodb database


// database goes here
// database parameter
const url = "mongodb://localhost:27017/hello";
const connect  = mongoose.connect(url);
connect.then((db)=>{
  console.log("Connected to the database");
})
// database ends here


var app = express();
app.use(passport.initialize());
app.use(passport.session());

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

// we make a middleware
// with session insted of cookies


// first you have to define the cofig for the session
// you have to give a name
// and a secret key this will be just kile cookie encryption
app.use(session({
  name: 'session-id',
  secret: '12345-3432-34-23',
  // this three things bellow will be explained later
  saveUninitialized : false, // init the saving functionality
  resave :false,        // if it is modified than dont modify
  store : new FileStore() // this will be the file based session not database
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);





// in this auth function we just check if there
// is a req.user
// if there any the proceed

function auth(req,res,next){
  console.log(req.user);
  if(!req.user){
    var err = new Error('You are not authenticated');
    err.status = 403;
    next(err);
  }else{
    next(); // pass them to the next
  }
}




app.use(auth);

// this two route will be included before the auth
// we give free access to the root and users
// '/' this does not require auth
// and '/users' need authentication
//app.use('/', indexRouter);
//app.use('/users', usersRouter);


//custom url goes here
app.use('/dishes',dishrouter);
app.use('/promotions',promorouter);
app.use('/leaders',leaderrouter);

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
