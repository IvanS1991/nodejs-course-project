const { getKey, parseTime } = require('../utils');

const userModel = (options) => {
  if (!options.username || !options.passHash) {
    throw new Error('you must pass username and passHash');
  }

  class User {
    constructor(username, passHash) {
      this.username = username;
      this.usernameLC = username.toLowerCase();
      this.passHash = passHash;
      this.comments = [];
      this.collections = [];
      this.authKey = getKey(username);
      this.joined = parseTime(new Date());
    }
  }

  return new User(options.username, options.passHash);
};

module.exports = userModel;
