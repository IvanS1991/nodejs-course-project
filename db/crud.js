const crud = (db) => {
  const getCrud = (collectionName) => {
    class Crud {
      findMany(query) {
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

      findOne(query) {
        return new Promise((resolve, reject) => {
          return db.collection(collectionName)
            .find(query)
            .toArray((findErr, matches) => {
              if (findErr) {
                return reject(findErr);
              }
              return resolve(matches);
            });
          })
          .then((matches) => {
            return matches[0];
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

      updatePush(query, data) {
        return new Promise((resolve, reject) => {
          return db.collection(collectionName)
            .updateOne(query, { $push: data }, (updateErr, result) => {
              if (updateErr) {
                return reject(updateErr);
              }
              return resolve(data);
            });
        });
      }

      updatePull(query, data) {
        return new Promise((resolve, reject) => {
          return db.collection(collectionName)
            .updateOne(query, { $pull: data }, (updateErr, result) => {
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
              return resolve({});
            });
        });
      }
    }
    return new Crud();
  };

  return getCrud;
};

module.exports = crud;
