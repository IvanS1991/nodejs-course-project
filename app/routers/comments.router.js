const { Router } = require('express');
const { ROUTES } = require('../../constants');

const commentsRouter = (app, controllers) => {
  const { comments } = controllers;
  const router = new Router();

  // CREATE
  router.post(ROUTES.COMMENTS.CREATE, comments.create);

  // DELETE
  router.post(ROUTES.COMMENTS.DELETE, comments.delete);

  app.use(ROUTES.COMMENTS.ROOT, router);
};

module.exports = commentsRouter;
