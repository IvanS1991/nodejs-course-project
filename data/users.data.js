const { getKey } = require('../utils');

const users = (database) => {
  const usersData = database('users');

  class UsersData {
    findByUsername(username) {
      return usersData.findOne({ username: username });
    }

    findByAuthKey(authKey) {
      return usersData.findOne({ authKey: authKey });
    }

    getNewAuthKey(user) {
      return usersData.update(user, { authKey: getKey(user.username) });
    }

    register(user) {
      return usersData.findOne({ username: user.username })
        .then((match) => {
          if (match) {
            return Promise.reject('existing user');
          }
          return usersData.insertOne(user);
        });
    }

    profile(filter) {
      return usersData.findOne(filter)
        .then((match) => {
          if (!match) {
            return Promise.reject('no such user');
          }
          const { username, collections, comments } = match;
          return {
            username,
            collections,
            comments,
          };
        });
    }

    update(options) {
      const { filter, data } = options;
      return usersData.findOne(filter)
        .then((match) => {
          if (!match) {
            return Promise.reject('no such user');
          }
          return usersData.update(filter, data);
        });
    }
  }

  return new UsersData();
};

module.exports = users;
