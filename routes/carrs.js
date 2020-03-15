const express = require('express');
const router = express.Router();
const VehicleModel = require('../model/vehicleModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
    let carrs = await VehicleModel.getModels('Porsche', '2015'); 
    carrs = carrs.Results
    res.render('template', {
    locals: {
      title: 'SkidPad.io',
      carrs: carrs,
      is_logged_in : req.session.is_logged_in
    },
    partials: {
      partial: 'partial-carr'
    }
  });
});

module.exports = router;

