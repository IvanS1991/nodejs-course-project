const { Router } = require('express');
const { ROUTES } = require('../../constants');

const { collectionModel } = require('../../models');

const collectionsRouter = (app, data) => {
  const { collections } = data;
  const router = new Router();

  // VIEW BY ID
  router.get(ROUTES.COLLECTIONS.VIEW, (req, res, next) => {
    const id = req.params.id;
    const filter = { authKey: req.user.authKey };

    return collections.view({ id, filter })
      .then((collection) => {
        return res.status(200)
          .json(collection);
      });
  });

  // CREATE
  router.post(ROUTES.COLLECTIONS.CREATE, (req, res, next) => {
    const filter = { authKey: req.user.authKey };
    const collection = collectionModel(req.body);

    return collections.create({ collection, filter })
      .then((output) => {
        console.log(output);
        return res.redirect('/');
      });
  });

  // UPDATE CONTENTS
  router.put(ROUTES.COLLECTIONS.UPDATE, (req, res, next) => {
    return collections.update;
  });

  // DELETE
  router.delete(ROUTES.COLLECTIONS.DELETE, (req, res, next) => {
    return collections.delete;
  });

  app.use(ROUTES.COLLECTIONS.ROOT, router);
};

module.exports = collectionsRouter;
