const models = require('../models');

const { DB_PATH } = require('../constants');
const { getAuthKey } = require('../utils');

const {
  connectDb,
  closeDb,
  find,
  insertOne,
  update,
} = require('./crud')('users');

const users = (() => {
  class UsersController {
    register(req, res) {
      const userData = req.body;
      const user = models.userModel(userData);
      user.userId = getAuthKey(user.username);
      user.authKey = getAuthKey(user.username);

      return connectDb(DB_PATH)
        .then((db) => {
          return find(db, { username: user.username });
        })
        .then((options) => {
          const { db, matches } = options;
          if (matches.length > 0) {
            return res.status(404)
              .json('existing user');
          }
          return insertOne(db, user);
        })
        .then((db) => {
          res.status(200)
            .json('OK');
            return closeDb(db);
        })
        .catch((db, err) => {
          db.close();
          return res.status(404)
            .json(err);
        });
    }

    auth(req, res) {
      const userData = req.body;

      return connectDb(DB_PATH)
        .then((db) => {
          return find(db, {
            username: userData.username,
            passHash: userData.passHash,
          });
        })
        .then((options) => {
          const { db, matches } = options;
          if (matches.length === 0) {
            db.close();
            return res.status(404)
              .json('wrong username or password');
          }
          const match = matches[0];
          res.status(200)
            .json(match.authKey);
          return closeDb(db);
        })
        .catch((db, err) => {
          db.close();
          return res.status(404)
            .json(err);
        });
    }

    profile(req, res) {
      const id = req.params.id;
      let filter = { authKey: req.headers['x-authkey'] };
      if (id) {
        filter = { userId: id };
      }

      return connectDb(DB_PATH)
        .then((db) => {
          return find(db, filter);
        })
        .then((options) => {
          const { db, matches } = options;
          if (matches.length === 0) {
            return res.status(404)
              .json('no such user');
          }
          const match = matches[0];
          res.status(200)
            .json({
              username: match.username,
              comments: match.comments,
              collections: match.collections,
            });
          return closeDb(db);
        })
        .catch((db, err) => {
          db.close();
          return res.status(404)
            .json(err);
        });
    }

    update(req, res) {
      const authKey = req.headers['x-authkey'];
      if (!authKey) {
        return res.status(404)
          .json('couldnt authorize user');
      }
      const data = req.body;
      const filter = { authKey: req.headers['x-authkey'] };

      return connectDb(DB_PATH)
        .then((db) => {
          return find(db, filter);
        })
        .then((options) => {
          const { db, matches } = options;
          if (matches.length === 0) {
            return res.status(404)
              .json('no such user');
          }
          return update(db, filter, data);
        })
        .then((db) => {
          res.status(200)
            .json('updated user data');
          return closeDb(db);
        })
        .catch((db, err) => {
          db.close();
          return res.status(404)
            .json(err);
        });
    }
  }

  return new UsersController();
})();

module.exports = users;
