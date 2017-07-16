const { getKey, parseTime } = require('../utils');

const commentModel = (options) => {
  if (!options.content) {
    throw new Error('comment must have content');
  }

  class Comment {
    constructor(content) {
      this.content = content;
      this.id = getKey('comm');
      this.created = parseTime(new Date());
    }
  }

  return new Comment(options.content);
};

module.exports = commentModel;
