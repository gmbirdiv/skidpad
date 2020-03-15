require('dotenv').config();

const express = require('express'),
  session = require('express-session'),
  FileStore = require(`session-file-store`)(session),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  flash = require('connect-flash'),
  expressValidator = require('express-validator'),
  es6Renderer = require('express-es6-template-engine');

const indexRouter = require('./routes/index'),
  vehiclesRouter = require('./routes/vehicles'),
  reviewRouter = require('./routes/reviews'),
  usersRouter = require('./routes/users');

const app = express();

app.engine('html', es6Renderer);
app.set('views', './views');
app.set('view engine', 'html');

app.use(
  session({
    store: new FileStore(),
    secret: process.env['SESH_SECRET'],
    resave: false,
    saveUninitialized: false,
    is_logged_in: false
  })
);

app.use(require('connect-flash')());
app.use(function(req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vehicles', vehiclesRouter);
app.use('/reviews', reviewRouter);

module.exports = app;
