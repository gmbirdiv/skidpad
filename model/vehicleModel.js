const db = require('./conn');
const bcrypt = require('bcryptjs');

class VehicleModel {
  constructor(id, Make_Name, Model_Name, ModelYear, VehicleTypeName) {
    this.id = id;
    this.Make_Name = Make_Name; 
    this.Model_Name = Model_Name; 
    this.ModelYear = ModelYear; 
    this.VehicleTypeName = VehicleTypeName;
  }

  static async getMakes(){
    try {
      const response = await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/passenger?format=json')
      return response.data
    }catch(e){
      return e 
    }
  }







  static async getModels(Make_Name, ModelYear){
      try {
          const response = await axios ({
            url: `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${Make_Name}/modelyear/${ModelYear}/vehicleType/passenger?format=json`,
            method: 'GET'
          });
          return response.data;

      }catch(e){
          return e
      }
  }



}

module.exports = VehicleModel; 