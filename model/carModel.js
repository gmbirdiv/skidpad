const db = require('./conn'),
  axios = require('axios'),
  bcrypt = require('bcryptjs');

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
      return res;
    } catch (error) {
      console.error('ERROR: ', error);
    }
  }
  static async addComment(car_id, user_id, comment) {
    try {
      const res = await db.one(
        `INSERT INTO comments (car_id, user_id, comment) VALUES ($1, $2, $3) RETURNING id`,
        [car_id, user_id, comment]
      );
      return res;
    } catch (error) {
      console.error('ERROR: ', error);
      return error;
    }
  }

  static async getComUserByCarID(id) {
    try {
      const res = await db.any(`SELECT comments.comment, users.username, cars.make, cars.model

      FROM comments
        INNER JOIN cars
          ON comments.car_id = cars.id
         INNER JOIN users
          on comments.user_id = users.id
         WHERE comments.car_id = ${id};`);
      return res;
    } catch (error) {
      console.error('ERROR: ', error);
    }
  }
}

module.exports = CarModel;
