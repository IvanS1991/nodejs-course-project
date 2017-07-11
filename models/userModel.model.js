const { getKey } = require('../utils');

const userModel = (options) => {
  if (!options.username || !options.passHash) {
    throw new Error('you must pass username and passHash');
  }

  class UserModel {
    constructor(username, passHash) {
      this.username = username;
      this.passHash = passHash;
      this.comments = [];
      this.collections = [];
      this.id = getKey(username);
      this.authKey = getKey(username);
    }
  }

  return new UserModel(options.username, options.passHash);
};

module.exports = userModel;
