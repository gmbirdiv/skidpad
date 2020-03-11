const express = require('express');
const router = express.Router();
const UserModel = require('../model/userModel'); 
const bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function(req, res, next) {
  res.render('template', {
    locals: {
      title: 'User Sign Up'
    },
    partials: {
      partial: 'partial-signup'
    }
  });
});

router.get('/login', function(req, res, next) {
  res.render('template', {
    locals: {
      title: 'User Login'
    },
    partials: {
      partial: 'partial-login'
    }
  });
});

router.post('/login', async function(req,res,next){
  const { username, password} = req.body; 

  const user = new UserModel(null, username, null, password);
  const loginResponse = await user.loginUser(); 
  console.log('loginResponse is', loginResponse.isValid); 

  console.table(loginResponse);

  if(!!loginResponse.isValid){
    req.session.is_logged_in = loginResponse.isValid; 
    req.session.id = loginResponse.id; 
    req.session.username = loginResponse.username; 
    res.redirect('/')
  } else {
    res.sendStatus(403); 
  }


}); 

router.post('/signup', function(req,res,next){
  const { username, email, password} = req.body; 

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = new UserModel(null,username, email, hash);
  user.addUser(); 
  res.sendStatus(200);
}); 

module.exports = router;
