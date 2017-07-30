const { Router } = require('express');
const { ROUTES } = require('../../constants');

const moviesRouter = (app, controllers) => {
  const { movies } = controllers;

  const router = new Router();

  // VIEW BY ID
  router.get(ROUTES.MOVIES.VIEW_ONE, movies.viewOne);

  // VIEW BY QUERY
  router.get(ROUTES.MOVIES.VIEW_SOME, movies.viewSome);

  app.use(ROUTES.MOVIES.ROOT, router);
};

module.exports = moviesRouter;
