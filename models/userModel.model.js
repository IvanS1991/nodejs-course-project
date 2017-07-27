const { getKey, parseTime,validaion } = require('../utils');

const userModel = (options) => {
  if (!options.username || !options.passHash) {
    throw new Error('you must pass username and passHash');
  }

  class User {
    constructor(username, passHash) {
      if(validation.validateLength(username, 3, 20)){
        throw new Error(' username length must be between 3 and 20 symbols');
      }
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
