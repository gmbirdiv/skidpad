const express = require('express'),
  router = express.Router(),
  CarModel = require('../model/carModel');

router.get('/:id?', async (req, res, next) => {
  const id = req.params.id;
  const data = await CarModel.getById(id);
  const rev = await CarModel.getRevById(id);
  const com = await CarModel.getComById(id);

  res.render('template', {
    locals: {
      title: data[0].title,
      data: data,
      rev: rev,
      com: com,
      is_logged_in : req.session.is_logged_in,
      user_id: req.session.user_id

    },
    partials: {
      partial: 'partial-reviews'
    }
  });
});

module.exports = router;
