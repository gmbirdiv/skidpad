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
  static async addComment(car_id, user_id, comment, likes, dislikes) {
    try {
      const res = await db.one(
        `INSERT INTO comments (car_id, user_id, comment, likes, dislikes) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [car_id, user_id, comment, likes, dislikes]
      );
      console.log(res);
      return res;
    } catch (error) {
      console.error('ERROR: ', error);
      return error;
    }
  }
  static async getComUserByCarID(id) {
    try {
      const res = await db.any(`SELECT comments.comment, users.username, comments.likes, comments.dislikes, cars.make, cars.model
      FROM comments
        INNER JOIN cars
          ON comments.car_id = cars.id
         INNER JOIN users
          on comments.user_id = users.id
         WHERE comments.car_id = ${id};`);
      console.log('Comment and User by CarID QUERY: ', res);
      return res;
    } catch (error) {
      console.error('ERROR: ', error);
    }
  }
}

module.exports = CarModel;
