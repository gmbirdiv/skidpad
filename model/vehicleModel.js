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
          const response = await axios ({
            url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/honda/modelyear/2015/vehicleType/passenger?format=json'
          });
          return response;

      }catch(e){
          return e
      }
  }


}

module.export = VehicleModel; 