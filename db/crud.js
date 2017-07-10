const crud = (db) => {
  const getCrud = (collectionName) => {
    class Crud {
      find(query) {
        return new Promise((resolve, reject) => {
          return db.collection(collectionName)
            .find(query)
            .toArray((findErr, matches) => {
              if (findErr) {
                return reject(findErr);
              }
              return resolve(matches);
            });
        });
      }

      insertOne(item) {
        return new Promise((resolve, reject) => {
          return db.collection(collectionName)
            .insertOne(item, (insertErr, result) => {
              if (insertErr) {
                return reject(insertErr);
              }
              return resolve(item);
            });
        });
      }

      insertMany(items) {
        return new Promise((resolve, reject) => {
          return db.collection(collectionName)
            .insertMany(items, (insertErr, result) => {
              if (insertErr) {
                return reject(insertErr);
              }
              return resolve(items);
            });
        });
      }

      update(query, data) {
        return new Promise((resolve, reject) => {
          return db.collection(collectionName)
            .updateOne(query, { $set: data }, (updateErr, result) => {
              if (updateErr) {
                return reject(updateErr);
              }
              return resolve(data);
            });
        });
      }

      remove(query) {
        return new Promise((resolve, reject) => {
          return db.collection(collectionName)
            .deleteMany(query, (deleteErr, result) => {
              if (deleteErr) {
                return reject(deleteErr);
              }
              return resolve();
            });
        });
      }
    }
    return new Crud();
  };

  return getCrud;
};

module.exports = crud;
