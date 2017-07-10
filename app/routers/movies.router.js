const { Router } = require('express');
const { ROUTES } = require('../../constants');

const attach = (app, data) => {
  const { movies } = data;
  const router = new Router();

  router.get(ROUTES.MOVIES.VIEW_ONE, (req, res) => {
    movies.viewOne(req, res)
      .then((movie) => {
        return res.status(200)
          .json(movie);
      })
      .catch((err) => {
        throw err;
      });
  });

  router.get(ROUTES.MOVIES.VIEW_SOME, (req, res) => {
    return movies.viewSome(req, res)
      .then((matches) => {
        return res.status(200)
          .json(matches);
      })
      .catch((err) => {
        throw err;
      });
  });

  router.post(ROUTES.MOVIES.UPDATE, movies.update);

  app.use(ROUTES.MOVIES.ROOT, router);
};

module.exports = attach;
