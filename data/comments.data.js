const { commentModel } = require('../models');

const comments = (database) => {
  const commentsData = database('comments');

  class CommentsData {
    create(options) {
      const { user, commentData } = options;

      const comment = commentModel(commentData);
      comment.author = user.username;

      return commentsData.insertOne(comment);
    }

    remove(options) {
      const { filter, user } = options;

      return commentsData.findOne(filter)
        .then((match) => {
          if (!match) {
            return Promise.reject('no such comment');
          }
          if (match.author !== user.username) {
            return Promise.reject('you are not the owner of this comment');
          }
          return commentsData.remove(filter);
        });
    }
  }

  return new CommentsData(database);
};

module.exports = comments;
