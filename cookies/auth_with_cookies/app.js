var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//app.use(cookieParser());

/*
ths cookie parser module will parse the cookies 
insalling comand is "npm install cookie-parser --save"
to use the cookie parser you just app.use(cookieParser())
but if you want te signed cookieParser with a secret cod then you have to give it
like app.use(cookieParser('<any rrandom number or pattern>'))
*/

var logger = require('morgan');
const mongoose = require('mongoose');

// this is the basic impor tof all the module

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// all the rest module goes here

const dishrouter = require('./routes/dishRouter');
const promorouter = require('./routes/promoRouter');
const leaderrouter = require('./routes/leaderRouter');
const Dishes = require('./models/dishes');
const Promotions = require('./models/promotions');
const Leaders = require('./models/leaders');
// all the import goes here


// database goes here
// database parameter
const url = "mongodb://localhost:27017/hello";
const connect  = mongoose.connect(url);
connect.then((db)=>{
  console.log("Connected to the database");
})
// database ends here


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


// we make a middleware here so before it goes to the 
// url it has to pass whe middleware
// first writ a basic auth function


// so in this authentication middleware we add the cookie
// and let the server send the save cookie command



/** new auth function with the cookies */

app.use(cookieParser('12345-5436-3434-12323'));


function auth(req,res,next){

  if(!req.signedCookies.user){
    var authHeader = req.headers.authorization;
        if(!authHeader){
          var err = new Error('You are not authenticated');
          res.setHeader('WWW-Authenticate','Basic');
          err.status = 401;
          next(err);
          return;
      }
      var auth = new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');
      var user = auth[0];
      var pass = auth[1];
      if(user == 'admin' && pass=='password'){
        res.cookie('user','admin',{ signed:true});
        next();
      }
        else{
          var err = new Error('You are not authenticated');
          res.setHeader("WWW-Authenticate",'Basic');
          err.status = 401;
          next(err);
        }
  }else{
    if(req.signedCookies.user ==='admin'){
      next();
    }else{
      var err = new Error('You are not authenticated');
      err.status = 401;
      next(err);
    }

  }

}




app.use(auth);


app.use('/', indexRouter);
app.use('/users', usersRouter);


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
