const express = require('express');
const router = express.Router();
const CarModel = require('../model/carModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('template', {
    locals: {
      title: 'SkidPad.io'
    },
    partials: {
      partial: 'partial-index'
    }
  });
});

/* POST comments to db */
router.post('/', async function(req, res) {
  const { car_id, user_id, comment } = req.body;
  const postData = await CarModel.addComment(car_id, user_id, comment);
  console.log(postData);
  res.redirect('back');
});

module.exports = router;
