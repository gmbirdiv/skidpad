const express = require('express'),
  router = express.Router(),
  CarModel = require('../model/carModel');

router.get('/:year/:make/:model', async (req, res, next) => {
  const year = req.params.year;
  const make = req.params.make;
  const model = req.params.model;
  // const rev = await CarModel.getRevById(id);
  // const com = await CarModel.getComUserByCarID(id);

  res.render('template', {
    locals: {
      make: make, 
      year : year, 
      model : model,
      // title: data[0].title,
      // data: data,
      // rev: rev,
      // com: com,
      is_logged_in: req.session.is_logged_in,
      user_id: req.session.user_id
    },
    partials: {
      partial: 'partial-carr-review'
    }
  });
});

module.exports = router;


