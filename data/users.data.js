const { getKey } = require('../utils');

const users = (database) => {
  const usersData = database('users');
  const commentsData = database('comments');
  const collectionsData = database('collections');

  class UsersData {
    findByUsername(username) {
      return usersData.findOne({ usernameLC: username.toLowerCase() });
    }

    findByAuthKey(authKey) {
      let user;
      return usersData.findOne({ authKey: authKey })
        .then((match) => {
          if (!match) {
            return Promise.reject('No such user!');
          }
          user = match;
          return collectionsData.findMany({ owner: user.username });
        })
        .then((collections) => {
          user.collections = collections;
          return user;
        });
    }

    getNewAuthKey(user) {
      return usersData.update(user, { authKey: getKey(user.username) });
    }

    register(user) {
      return usersData.findOne({ username: user.username })
        .then((match) => {
          if (match) {
            return Promise.reject('Existing user!');
          }
          return usersData.insertOne(user);
        });
    }

    profile(filter) {
      let user;
      const profile = {};
      return usersData.findOne(filter)
        .then((match) => {
          if (!match) {
            return Promise.reject('Non-existing user!');
          }
          profile.user = user = match;
          return commentsData.findMany({ author: user.username });
        })
        .then((comments) => {
          profile.comments = comments;
          return collectionsData.findMany({ owner: user.username });
        })
        .then((collections) => {
          profile.collections = collections;
          return profile;
        });
    }

    update(options) {
      const { filter, data } = options;
      return usersData.findOne(filter)
        .then((match) => {
          if (!match) {
            return Promise.reject('Non-existing user!');
          }
          return usersData.update(filter, data);
        });
    }
  }

  return new UsersData();
};

module.exports = users;
