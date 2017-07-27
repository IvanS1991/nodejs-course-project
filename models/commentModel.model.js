const { getKey, parseTime } = require('../utils');

const commentModel = (options) => {
  if (!options.content || !options.movieId) {
    throw new Error('comment must have content');
  }

  class Comment {
    constructor(content, movieId) {
      this.content = content;
      this.id = getKey('comment');
      this.movieId = parseInt(movieId, 10);
      this.created = parseTime(new Date());
    }
  }

  return new Comment(options.content, options.movieId);
};

module.exports = commentModel;
