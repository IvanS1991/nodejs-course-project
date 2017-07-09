const mongo = require('mongodb');

const crud = (collectionName) => {
  class Crud {
    connectDb(dbPath) {
      return new Promise((resolve, reject) => {
        mongo.connect(dbPath, (err, db) => {
          if (err) {
            return reject(err);
          }
          return resolve(db);
        });
      });
    }

    closeDb(db) {
      return new Promise((resolve, reject) => {
        db.close();
      });
    }

    find(db, query) {
      return new Promise((resolve, reject) => {
        return db.collection(collectionName)
          .find(query)
          .toArray((findErr, matches) => {
            if (findErr) {
              db.close();
              return reject(findErr);
            }
            return resolve({
              db,
              matches,
            });
          });
      });
    }

    insertOne(db, item) {
      return new Promise((resolve, reject) => {
        return db.collection(collectionName)
          .insertOne(item, (insertErr, result) => {
            if (insertErr) {
              return reject(insertErr);
            }
            return resolve(db);
          });
      });
    }

    update(db, query, data) {
      return new Promise((resolve, reject) => {
        return db.collection(collectionName)
          .updateOne(query, { $set: data }, (updateErr, result) => {
            if (updateErr) {
              return reject(updateErr);
            }
            return resolve(db);
          });
      });
    }

    remove(db, query) {
      return new Promise((resolve, reject) => {
        return db.collection(collectionName)
          .deleteMany(query, (deleteErr, result) => {
            if (deleteErr) {
              return reject(deleteErr);
            }
            return resolve(db);
          });
      });
    }
  }

  return new Crud();
};

module.exports = crud;
