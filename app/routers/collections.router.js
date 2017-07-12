const { Router } = require('express');
const { ROUTES } = require('../../constants');

const collectionsRouter = (app, data) => {
  const { collections } = data;
  const router = new Router();

  // VIEW BY ID
  router.get(ROUTES.COLLECTIONS.VIEW, collections.view);

  // CREATE
  router.post(ROUTES.COLLECTIONS.CREATE, collections.create);

  // UPDATE CONTENTS
  router.put(ROUTES.COLLECTIONS.UPDATE, collections.update);

  // DELETE
  router.delete(ROUTES.COLLECTIONS.DELETE, collections.delete);

  app.use(ROUTES.COLLECTIONS.ROOT, router);
};

module.exports = collectionsRouter;
