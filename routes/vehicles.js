const express = require('express');
const router = express.Router();
const CarModel = require('../model/carModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const cars = await CarModel.getAllCars();
  res.render('template', {
    locals: {
      title: 'SkidPad.io',
      cars: cars
    },
    partials: {
      partial: 'partial-vehicles'
    }
  });
});

module.exports = router;
