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
  static async getById(id) {
    try {
      const res = await db.any(`SELECT *
    FROM cars
    WHERE cars.id = ${id};`);
      console.log('ID QUERY:', res);
      return res;
    } catch (error) {
      console.error('ERROR: ', error);
    }
  }
  static async getRevById(id) {
    try {
      const res = await db.any(`SELECT *
    FROM reviews
    WHERE reviews.car_id = ${id};`);
      console.log('REV ID QUERY: ', res);
      return res;
    } catch (error) {
      console.error('ERROR: ', error);
    }
  }
}

module.exports = CarModel;
