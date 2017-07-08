const { Router } = require('express');
const { ROUTES } = require('../../constants');

const attach = (app, data) => {
  const { collections } = data;
  const router = new Router();

  router.get(ROUTES.COLLECTIONS.VIEW, collections.view);
  router.post(ROUTES.COLLECTIONS.CREATE, collections.create);
  router.put(ROUTES.COLLECTIONS.UPDATE, collections.update);
  router.delete(ROUTES.COLLECTIONS.DELETE, collections.delete);

  app.use(ROUTES.COLLECTIONS.ROOT, router);
};

module.exports = attach;
