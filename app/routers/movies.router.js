const { Router } = require('express');
const { ROUTES } = require('../../constants');

const attach = (app, data) => {
  const { movies } = data;
  const router = new Router();

  router.get(ROUTES.MOVIES.VIEW_ONE, movies.viewOne);
  router.get(ROUTES.MOVIES.VIEW_SOME, movies.viewSome);
  router.post(ROUTES.MOVIES.UPDATE, movies.update);

  app.use(ROUTES.MOVIES.ROOT, router);
};

module.exports = attach;
