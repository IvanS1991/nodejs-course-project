const comments = (database) => {
  const commentsData = database('comments');

  class CommentsData {
    create(comment) {
      return commentsData.insertOne(comment);
    }

    remove(options) {
      const { filter, user } = options;

      return commentsData.findOne(filter)
        .then((match) => {
          if (!match) {
            return Promise.reject('Non-existing comment!');
          }
          if (match.author !== user.username) {
            return Promise.reject('You are not the owner of this comment!');
          }
          return commentsData.remove(filter);
        });
    }
  }

  return new CommentsData(database);
};

module.exports = comments;
