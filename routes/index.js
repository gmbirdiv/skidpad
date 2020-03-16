const express = require('express');
const router = express.Router();
const CarModel = require('../model/carModel');
const VehicleModel = require('../model/vehicleModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
const { year, make } = req.query;
let makes = await VehicleModel.getMakes(); 
makes = makes.Results; 
console.log(year, make)

let carrs = await VehicleModel.getModels(make, year); 
carrs = carrs.Results
console.log(carrs)

res.render('template', {
    locals: {
      title: 'SkidPad.io',
      is_logged_in : req.session.is_logged_in,
      makes : makes,
      carrs: carrs,
      year: year
    },
    partials: {
      partial: 'partial-index'
    }
  });
});

/* POST comments to db */
// router.post('/', async function(req, res) {
//   const { car_id, user_id, comment } = req.body;
//   const postData = await CarModel.addComment(car_id, user_id, comment);
//   const id = postData.car_id
//   console.log(postData);
//   res.redirect("back");
// });

router.post('/', async function(req, res) {
  const { model_name, model_year,  user_id, comment } = req.body;
  const postData = await VehicleModel.addComment(model_name, model_year, user_id, comment);
  // const id = postData.car_id
  console.log(postData);
  res.redirect("back");
});


module.exports = router;
