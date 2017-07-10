const models = require('../models');

const { getAuthKey } = require('../utils');

const users = (database) => {
  const { find, insertOne, update } = database('users');

  class UsersController {
    register(req, res) {
      const userData = req.body;
      const user = models.userModel(userData);
      user.userId = getAuthKey(user.username);
      user.authKey = getAuthKey(user.username);

      return find({ username: user.username })
        .then((matches) => {
          return matches[0];
        })
        .then((match) => {
          if (match) {
            return res.status(404)
              .json('existing user');
          }
          return insertOne(user);
        })
        .then((inserted) => {
          const { username, authKey } = inserted;
          return {
            username,
            authKey,
          };
        });
    }

    auth(req, res) {
      const { username, passHash } = req.body;

      return find({ username, passHash })
        .then((matches) => {
          return matches[0];
        })
        .then((match) => {
          if (!match) {
            return res.status(404)
              .json('wrong username or password');
          }
          return match.authKey;
        })
        .catch((err) => {
          throw err;
        });
    }

    profile(req, res) {
      const id = req.params.id;
      let filter = { authKey: req.headers['x-authkey'] };
      if (id) {
        filter = { userId: id };
      }

      return find(filter)
        .then((matches) => {
          return matches[0];
        })
        .then((match) => {
          if (!match) {
            return res.status(404)
              .json('no such user');
          }
          const { username, collections, comments } = match;
          return {
            username,
            collections,
            comments,
          };
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

      return find(filter)
        .then((matches) => {
          return matches[0];
        })
        .then((match) => {
          if (!match) {
            return res.status(404)
              .json('no such user');
          }
          return update(filter, data);
        });
    }
  }

  return new UsersController();
};

module.exports = users;
