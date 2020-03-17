const express = require('express'),
  router = express.Router(),
  VehicleModel = require('../model/vehicleModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const { year, make } = req.query;
  let makes = await VehicleModel.getMakes();
  makes = makes.Results;

  let carrs = await VehicleModel.getModels(make, year);
  carrs = carrs.Results;

  res.render('template', {
    locals: {
      title: 'SkidPad.io',
      is_logged_in: req.session.is_logged_in,
      makes: makes,
      carrs: carrs,
      year: year
    },
    partials: {
      partial: 'partial-index'
    }
  });
});

router.post('/', async function(req, res) {
  const { model_name, model_year, user_id, comment } = req.body;
  const postData = await VehicleModel.addComment(
    model_name,
    model_year,
    user_id,
    comment
  );
  res.redirect('back');
});

module.exports = router;
