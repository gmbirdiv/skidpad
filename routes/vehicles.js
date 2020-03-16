const express = require('express'),
  router = express.Router(),
  CarModel = require('../model/carModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const cars = await CarModel.getAllCars();
  res.render('template', {
    locals: {
      title: 'SkidPad.io',
      cars: cars,
      is_logged_in: req.session.is_logged_in
    },
    partials: {
      partial: 'partial-vehicles'
    }
  });
});

module.exports = router;
