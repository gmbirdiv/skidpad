const express = require('express'),
  router = express.Router(),
  CarModel = require('../model/carModel');

router.get('/:id?', async (req, res, next) => {
  const id = req.params.id;
  const data = await CarModel.getById(id);
  const rev = await CarModel.getRevById(id);

  res.render('template', {
    locals: {
      title: data[0].title,
      data: data,
      rev: rev
    },
    partials: {
      partial: 'partial-reviews'
    }
  });
});

module.exports = router;
