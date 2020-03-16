const express = require('express'),
  router = express.Router(),
  VehicleModel = require('../model/vehicleModel');

router.get('/:year/:make/:model', async (req, res, next) => {
  const year = req.params.year;
  const make = req.params.make;
  const model = req.params.model;
  const rev = await VehicleModel.getRevById(model,year);
  console.log(rev)
  const com = await VehicleModel.getComUserByCarID(model,year);

  res.render('template', {
    locals: {
      make: make, 
      year : year, 
      model : model,
      // title: data[0].title,
      // data: data,
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

// router.post('/', async function(req, res) {
//   const { model_year, model_name, user_id, comment } = req.body;
//   const postData = await VehicleModel.addComment(model_year, model_name, user_id, comment);
//   // const id = postData.car_id
//   console.log('hello', postData);
//   res.redirect("back");
// });


module.exports = router;


