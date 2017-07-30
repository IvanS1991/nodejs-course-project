const { Router } = require('express');
const { ROUTES } = require('../../constants');

const collectionsRouter = (app, controllers) => {
  const { collections } = controllers;
  const router = new Router();

  // VIEW ALL PUBLIC
  router.get('/', collections.getAll);

  // VIEW BY ID
  router.get(ROUTES.COLLECTIONS.VIEW, collections.getById);

  // CREATE
  router.post(ROUTES.COLLECTIONS.CREATE, collections.create);

  // UPDATE DETAILS
  router.post(ROUTES.COLLECTIONS.UPDATE, collections.update);

  // ADD TO COLLECTION
  router.post(ROUTES.COLLECTIONS.ADD, collections.addTo);

  // REMOVE FROM COLLECTION
  router.post(ROUTES.COLLECTIONS.REMOVE, collections.removeFrom);

  // DELETE
  router.post(ROUTES.COLLECTIONS.DELETE, collections.delete);

  app.use(ROUTES.COLLECTIONS.ROOT, router);
};

module.exports = collectionsRouter;
