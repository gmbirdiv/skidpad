const express = require('express'),
  router = express.Router(),
  VehicleModel = require('../model/vehicleModel');

router.get('/:year/:make/:model', async (req, res, next) => {
  const year = req.params.year;
  const make = req.params.make;
  const model = req.params.model;
  const rev = await VehicleModel.getRevById(model, year);
  const com = await VehicleModel.getComUserByCarID(model, year);

  res.render('template', {
    locals: {
      make: make,
      year: year,
      model: model,
      rev: rev,
      com: com,
      is_logged_in: req.session.is_logged_in,
      user_id: req.session.user_id
    },
    partials: {
      partial: 'partial-carr-review'
    }
  });
});

module.exports = router;
