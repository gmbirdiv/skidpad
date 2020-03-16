const express = require('express'),
  router = express.Router(),
  UserModel = require('../model/userModel'),
  bcrypt = require('bcryptjs');

router.get('/signup', function(req, res, next) {
  res.render('template', {
    locals: {
      title: 'User Sign Up',
      is_logged_in: req.session.is_logged_in
    },
    partials: {
      partial: 'partial-signup'
    }
  });
});

router.get('/login', function(req, res, next) {
  res.render('template', {
    locals: {
      title: 'User Login',
      is_logged_in: req.session.is_logged_in
    },
    partials: {
      partial: 'partial-login'
    }
  });
});

router.post('/login', async function(req, res, next) {
  const { username, password } = req.body;
  const user = new UserModel(null, username, null, password);
  const loginResponse = await user.loginUser();
  console.log('loginResponse is', loginResponse.isValid);

  console.table(loginResponse);

  if (!!loginResponse.isValid) {
    req.session.is_logged_in = loginResponse.isValid;
    req.session.user_id = loginResponse.user_id;
    req.session.username = loginResponse.username;
    res.redirect('/');
  } else {
    res.sendStatus(403);
  }
});

const { check, validationResult } = require('express-validator');

router.post(
  '/signup',
  [
    check('username')
      .isLength({ min: 1 })
      .withMessage('Must have a username'),
    check('email')
      .isLength({ min: 1 })
      .withMessage('Must have an email address'),
    check('password')
      .isLength({ min: 1 })
      .withMessage('Must have a password')
  ],
  async function(req, res, next) {
    const { username, email, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const user = new UserModel(null, username, email, hash);
    user.addUser();
    res.sendStatus(200);
  }
);

router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
