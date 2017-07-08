const mongo = require('mongodb');
const assert = require('assert');

const models = require('../models');
const { DB_PATH } = require('../constants');

const { getAuthKey } = require('../utils');

const users = (() => {
  class UsersController {
    register(req, res) {
      const userData = req.body;
      const user = models.userModel(userData);
      user.authKey = getAuthKey(user.username);

      mongo.connect(DB_PATH, (connectErr, db) => {
        assert.equal(null, connectErr);

        new Promise((resolve, reject) => {
          db.collection('users')
            .find({ username: user.username })
            .toArray((findErr, match) => {
              assert.equal(null, findErr);

              if (match.length > 0) {
                db.close();
                return reject('Existing user');
              }

              db.collection('users')
                .insertOne(user, (insertErr, result) => {
                  assert.equal(null, insertErr);
                  db.close();
                  return resolve('OK');
                });
              return 0;
            });
        })
          .then((msg) => {
            res.status(200)
              .json(user.authKey);
          })
          .catch((error) => {
            res.status(404)
              .json(error);
          });
      });
    }

    auth(req, res) {
      const userData = req.body;
      mongo.connect(DB_PATH, (connectErr, db) => {
        assert.equal(null, connectErr);

        new Promise((resolve, reject) => {
          db.collection('users')
            .find({
              username: userData.username,
              passHash: userData.passHash,
            })
            .toArray((findErr, match) => {
              assert.equal(null, findErr);

              const user = match[0];

              if (!user) {
                db.close();
                return reject('Wrong username or password');
              }

              user.authKey = getAuthKey(user.username);
              db.close();
              return resolve(user.authKey);
            });
        })
          .then((result) => {
            res.status(200)
              .json(result);
          })
          .catch((error) => {
            res.status(404)
              .json(error);
          });
      });
    }

    profile(req, res) {
      res.json('view user profile');
    }

    update(req, res) {
      res.json('update user profile');
    }
  }

  return new UsersController();
})();

module.exports = users;
