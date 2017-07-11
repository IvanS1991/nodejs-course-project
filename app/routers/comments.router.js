const { Router } = require('express');
const { ROUTES } = require('../../constants');

const attach = (app, data) => {
  const { comments } = data;
  const router = new Router();

  router.post(ROUTES.COMMENTS.CREATE, (req, res) => {
    return comments.create(req, res)
      .then((movie) => {
        return res.status(200)
          .json(movie);
      })
      .catch((err) => {
        throw err;
      });
  });

  router.delete(ROUTES.COMMENTS.DELETE, comments.remove);

  app.use(ROUTES.COMMENTS.ROOT, router);
};

module.exports = attach;
