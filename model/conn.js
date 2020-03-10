require('dotenv').config();

const options = {
  host: process.env['DB_HOST'],
  user: process.env['DB_USER'],
  database: process.env['DB'],
  password: process.env['DB_PASSWORD']
};

const pgp = require('pg-promise')({
  query: function(e) {
    console.log('QUERY:', e.query);
  }
});

const db = pgp(options);

module.exports = db;
