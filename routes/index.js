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

/* POST review to db */
router.post('/', async function(req, res) {
  const { car_id, review_text } = req.body;
  const postData = await CarModel.addReview(car_id, review_text);
  console.log(postData);
  res.sendStatus(200);
});

module.exports = router;
