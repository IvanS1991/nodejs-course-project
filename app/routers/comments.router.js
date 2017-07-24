const { Router } = require('express');
const { ROUTES } = require('../../constants');

const commentsRouter = (app, data) => {
  const { comments } = data;
  const router = new Router();

  // CREATE
  router.post(ROUTES.COMMENTS.CREATE, (req, res, next) => {
    const user = req.user;
    const commentData = req.body;

    return comments.create({ user, commentData })
      .then((comment) => {
        return res.status(200)
          .redirect('/movies/view/' + comment.movieId + '#comments-collapsed');
      })
      .catch((err) => {
        next(err);
      });
  });

  // DELETE
  router.post(ROUTES.COMMENTS.DELETE, (req, res, next) => {
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
  });

  app.use(ROUTES.COMMENTS.ROOT, router);
};

module.exports = commentsRouter;
