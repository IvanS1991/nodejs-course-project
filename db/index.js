const mongo = require('mongodb');

const { DB_PATH } = require('../constants');

const crud = require('./crud');

const database = (() => {
  return new Promise((resolve, reject) => {
    mongo.connect(DB_PATH, (err, db) => {
      if (err) {
        return reject(err);
      }
      return resolve(db);
    });
  })
    .then((db) => {
      return crud(db);
    });
})();

module.exports = database;
