const { Router } = require('express');
const { ROUTES } = require('../../constants');

const commentsRouter = (app, data) => {
  const { comments } = data;
  const router = new Router();

  // CREATE
  router.post(ROUTES.COMMENTS.CREATE, (req, res) => {
    const commentData = req.body;

    const userFilter = { authKey: req.user.authKey };
    const movieFilter = { id: parseInt(commentData.movieId, 10) };


    return comments.create({ commentData, userFilter, movieFilter })
      .then((movie) => {
        return res.status(200)
          .json(movie);
      })
      .catch((err) => {
        return res.status(404)
          .json(err);
      });
  });

  // DELETE
  router.delete(ROUTES.COMMENTS.DELETE, comments.remove);

  app.use(ROUTES.COMMENTS.ROOT, router);
};

module.exports = commentsRouter;
