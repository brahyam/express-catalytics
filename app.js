const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const winston = require('winston');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const moongose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const expressHandlebars = require('express-handlebars');
const handlebars = expressHandlebars.create({
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
  defaultLayout: 'main.handlebars'
});

winston.level = process.env.LOG_LEVEL || 'info';

var index = require('./routes/index');
var users = require('./routes/users');
var products = require('./routes/products');
var authentication = require('./routes/authentication');

var app = express();

// db setup
moongose.connect(process.env.MONGODB_URI);

// require('./config/passport')(passport);

// view engine setup
app.engine('handlebars', handlebars.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session config
app.use(session({secret: process.env.SESSION_SECRET || 'ILoveMartha'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', index);
app.use('/', authentication);
app.use('/users', users);
app.use('/products', products);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
