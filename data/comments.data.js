const { commentModel } = require('../models');

const { getKey } = require('../utils');

const comments = (database) => {
  const moviesData = database('movies');
  const usersData = database('users');

  class CommentsData {
    create(req, res) {
      const commentData = req.body;

      const userFilter = { authKey: req.headers['x-authkey'] };
      const movieFilter = { id: commentData.movieId };

      const comment = commentModel(commentData);
      comment.id = getKey('comment' + Math.floor(Math.random() * 100000));

      return usersData.findOne(userFilter)
        .then((user) => {
          if (!user) {
            return res.status(404)
              .json('no such user');
          }
          comment.author = user.username;
          return usersData.updatePush(userFilter, { comments: comment });
        })
        .then(() => {
          return moviesData.findOne(movieFilter);
        })
        .then((movie) => {
          return moviesData.updatePush(movieFilter, { comments: comment });
        });
    }

    remove(req, res) {
      const id = req.params.id;
      res.json('delete comment ' + id);
    }
  }

  return new CommentsData(database);
};

module.exports = comments;
