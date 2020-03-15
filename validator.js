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

const { body, validationResult } = require('express-validator');
const userValidationRules = () => {
  return [
    // username must be 5 chars long
    body('username').isLength({ min: 5 }),
    //email must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 })
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  const errorUser = extractedErrors[0];
  const errorEmail = extractedErrors[1];
  const errorPw = extractedErrors[2];

  console.log('extracted errors :', extractedErrors);

  return res.render('template', {
    locals: {
      title: 'Sign up',
      errorUser: errorUser,
      errorEmail: errorEmail,
      errorPw: errorPw,
      is_logged_in: req.session.is_logged_in
    },
    partials: {
      partial: 'partial-signupfail'
    }
  });
};

module.exports = {
  userValidationRules,
  validate
};
