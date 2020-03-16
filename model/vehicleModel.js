const db = require('./conn'),
  axios = require('axios'),
  bcrypt = require('bcryptjs');

class VehicleModel {
  constructor(id, Make_Name, Model_Name, ModelYear, VehicleTypeName) {
    this.id = id;
    this.Make_Name = Make_Name;
    this.Model_Name = Model_Name;
    this.ModelYear = ModelYear;
    this.VehicleTypeName = VehicleTypeName;
  }
  static async getMakes() {
    try {
      const response = await axios.get(
        'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/passenger?format=json'
      );
      return response.data;
    } catch (e) {
      return e;
    }
  }
  static async getModels(Make_Name, ModelYear) {
    try {
      const response = await axios({
        url: `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${Make_Name}/modelyear/${ModelYear}/vehicleType/passenger?format=json`,
        method: 'GET'
      });
      return response.data;
    } catch (e) {
      return e;
    }
  }
  static async getRevById(Model_Name, ModelYear) {
    try {
      const res = await db.any(`SELECT *
    FROM reviews
    WHERE reviews.modelyear = ${ModelYear} AND reviews.modelname = '${Model_Name}';`);
      console.log('REV ID QUERY: ', res);
      return res;
    } catch (error) {
      console.error('ERROR: ', error);
    }
  }
  static async addComment(Model_Name, ModelYear, user_id, comment) {
    try {
      const res = await db.one(
        `INSERT INTO comments (modelname, modelyear, user_id, comment) VALUES ($1, $2, $3, $4) RETURNING id`,
        [Model_Name, ModelYear, user_id, comment]
      );
      console.log(res);
      return res;
    } catch (error) {
      console.error('ERROR: ', error);
      return error;
    }
  }
  static async getComUserByCarID(Model_Name, Model_Year) {
    try {
      const res = await db.any(`SELECT comments.comment, users.username, comments.modelname, comments.modelyear
      FROM comments
         INNER JOIN users
          on comments.user_id = users.id
         WHERE comments.modelname = '${Model_Name}' AND comments.modelyear = ${Model_Year};`);
      console.log('Comment and User by CarID QUERY: ', res);
      return res;
    } catch (error) {
      console.error('ERROR: ', error);
    }
  }
}

module.exports = VehicleModel;
