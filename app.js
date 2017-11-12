var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);

var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//register path to partials
hbsutils.registerPartials(`${__dirname}/views/partials`);
hbsutils.registerWatchedPartials(`${__dirname}/views/partials`)


// create session 
// app.set('trust proxy', 1) // trust first proxy
app.use(cookieSession({
	name: 'expression',
    secret: 'keyboard cat',
    resave: false,
  	saveUninitialized: true,
  	cookie: { secure: false }
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static (`${__dirname}/node_modules/bootstrap/dist`));
app.use('/font-awesome', express.static (`${__dirname}/node_modules/font-awesome`));
app.use('/jquery', express.static (`${__dirname}/node_modules/jquery/dist`));

app.use('/', index);
app.use('/users', users);
app.use('/admin', requireLogin, admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

// buat filter login
function requireLogin(req, res, next) {
  if (req.session.loggedIn) {
    next(); // allow the next route to run
  } else {
    // require the user to log in
    res.redirect("/login"); // or render a form, etc.
  }
}

module.exports = app;
