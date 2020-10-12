var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
const  session = require('express-session');
const flash = require('connect-flash');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://staycation:28agustus@cluster0.3mrpv.mongodb.net/db_staycation?retryWrites=true&w=majority', {useNewUrlParser: true, 
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false,});


//router admin
const adminRouter = require('./routes/admin');
const apiRouter = require('./routes/api');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS,PATH');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  next()
})
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','http://localhost:3000/checkout');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS,PATH');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  next()
})
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS,PATH');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  next()
})
app.use('/sb-admin-2',express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')));
// admin
app.use('/admin',adminRouter);
app.use('/api/v1/member',apiRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
