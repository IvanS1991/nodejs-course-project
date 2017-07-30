const { Router } = require('express');

const { ROUTES } = require('../../constants');

const miscRouter = (app, controllers) => {
  const { misc } = controllers;

  const router = new Router();

  router.get('/', misc.home);

  router.get(ROUTES.MISC.ABOUT, misc.about);

  router.get(ROUTES.MISC.LOGIN, misc.login);

  router.get(ROUTES.MISC.REGISTER, misc.register);

  router.get(ROUTES.MISC.LOGOUT, misc.logout);

  router.get(ROUTES.MISC.MOVIES, misc.movies);

  router.get(ROUTES.MISC.NEW_COLLECTION, misc.newCollection);

  app.use('/', router);
};

module.exports = miscRouter;
