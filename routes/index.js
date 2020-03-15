const express = require('express');
const router = express.Router();
const CarModel = require('../model/carModel');
const VehicleModel = require('../model/vehicleModel');


/* GET home page. */
router.get('/', async function(req, res, next) {
  
//   let dropdown = document.querySelector('.dropdown');
//   dropdown.addEventListener('click', function(event) {
//   event.stopPropagation();
//   dropdown.classList.toggle('is-active');
// });

let makes = await VehicleModel.getMakes(); 
makes = makes.Results
let carrs = await VehicleModel.getModels('Porsche', '2015'); 
carrs = carrs.Results
 
res.render('template', {
    locals: {
      title: 'SkidPad.io',
      is_logged_in : req.session.is_logged_in,
      makes : makes,
      carrs: carrs
    },
    partials: {
      partial: 'partial-index'
    }
  });
});

/* POST comments to db */
router.post('/', async function(req, res) {
  const { car_id, user_id, comment } = req.body;
  const postData = await CarModel.addComment(car_id, user_id, comment);
  const id = postData.car_id
  console.log(postData);
  res.redirect("back");
});

module.exports = router;
