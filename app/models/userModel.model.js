const { getAuthKey } = require('../utils');

const userModel = (options) => {
  class UserModel {
    constructor(username, passHash) {
      this.username = username;
      this.passHash = passHash;
      this.authKey = getAuthKey(username);
      this.comments = [];
      this.collections = [];
    }
  }

  return new UserModel(options.username, options.passHash);
};

module.exports = userModel;
