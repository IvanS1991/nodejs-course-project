const users = (database) => {
  const usersDb = database('users');

  class UsersData {
    register(user) {
      return usersDb.findOne({ username: user.username })
        .then((match) => {
          if (match) {
            return Promise.reject(new Error('existing user'));
          }
          return usersDb.insertOne(user);
        });
    }

    auth(filter) {
      return usersDb.findOne(filter)
        .then((match) => {
          if (!match) {
            return Promise.reject(new Error('wrong username or password'));
          }
          return {
            authKey: match.authKey,
          };
        });
    }

    profile(filter) {
      return usersDb.findOne(filter)
        .then((match) => {
          if (!match) {
            return Promise.reject(new Error('no such user'));
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
      return usersDb.findOne(filter)
        .then((match) => {
          if (!match) {
            return Promise.reject(new Error('no such user'));
          }
          return usersDb.update(filter, data);
        });
    }
  }

  return new UsersData();
};

module.exports = users;
