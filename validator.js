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
    return next(), res.redirect('/');
  }
<<<<<<< HEAD
 

  console.log(errors.errors)
=======
>>>>>>> 7262101e3ba07314a5f37ec0e1029e545c99c68e

  return res.render('template', {
    locals: {
      title: 'Sign up',
      errors: errors.errors,
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
