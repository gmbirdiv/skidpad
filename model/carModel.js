const db = require('./conn');
const bcrypt = require('bcryptjs');

class CarModel {
  constructor(id, year, make, model) {
    this.id = id;
    this.year = year;
    this.make = make;
    this.model = model;
  }
  static async getAllCars() {
    try {
      const response = await db.any(`SELECT *
          FROM cars;`);
      console.log('DB QUERY: ', response);
      return response;
    } catch (error) {
      console.error('error: ', error);
      return error;
    }
  }
}

module.exports = CarModel;
