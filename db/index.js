const mongo = require('mongodb');

const crud = require('./crud');

const database = (dbPath) => {
  return new Promise((resolve, reject) => {
    mongo.connect(dbPath, (err, db) => {
      if (err) {
        return reject(err);
      }
      return resolve(db);
    });
  })
    .then((db) => {
      return crud(db);
    });
};

module.exports = database;
