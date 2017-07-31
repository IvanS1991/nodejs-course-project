const { commentModel } = require('../models');

const { validation } = require('../utils/');
const { isInvalidCommentContent } = validation();

const commentsController = (data) => {
  const { comments } = data;

  class CommentsController {
    create(req, res, next) {
      const user = req.user;
      const commentData = req.body;

      if (isInvalidCommentContent(commentData.content)) {
        return next('Comments must be between 1 and 200 symbols long!');
      }

      const comment = commentModel(commentData);
      comment.author = user.username;


      return comments.create(comment)
        .then((result) => {
          return res.status(200)
            .redirect('/movies/view/' + result.movieId + '#comments-collapsed');
        })
        .catch((err) => {
          next(err);
        });
    }

    delete(req, res, next) {
      const movieId = req.body.movieId;
      const filter = { id: req.params.id };
      const user = req.user;

      return comments.remove({ filter, user })
        .then((comment) => {
          return res.status(200)
            .redirect('/movies/view/' + movieId + '#comments-collapsed');
        })
        .catch((err) => {
          next(err);
        });
    }
  }

  return new CommentsController();
};

module.exports = commentsController;
