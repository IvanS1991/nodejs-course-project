const { Router } = require('express');
const { ROUTES } = require('../../constants');

const attach = (app, data) => {
  const { comments } = data;
  const router = new Router();

  router.get(ROUTES.COMMENTS.VIEW, comments.view);
  router.post(ROUTES.COMMENTS.CREATE, comments.create);
  router.delete(ROUTES.COMMENTS.DELETE, comments.delete);

  app.use(ROUTES.COMMENTS.ROOT, router);
};

module.exports = attach;
