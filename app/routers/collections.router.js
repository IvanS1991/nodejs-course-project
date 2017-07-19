const { Router } = require('express');
const { ROUTES } = require('../../constants');

const { collectionModel } = require('../../models');

const collectionsRouter = (app, data) => {
  const { collections } = data;
  const router = new Router();

  // VIEW BY ID
  router.get(ROUTES.COLLECTIONS.VIEW, (req, res, next) => {
    const filter = { id: req.params.id };
    const user = req.user;

    return collections.view({ filter, user })
      .then((collection) => {
        return res.status(200)
          .json(collection);
      })
      .catch((err) => {
        next(err);
      });
  });

  // CREATE
  router.post(ROUTES.COLLECTIONS.CREATE, (req, res, next) => {
    const username = req.user.username;
    const collection = collectionModel(req.body);
    collection.owner = username;

    return collections.create(collection)
      .then((output) => {
        return res.redirect('/');
      });
  });

  // UPDATE DETAILS
  router.post(ROUTES.COLLECTIONS.UPDATE, (req, res, next) => {
    const filter = { id: req.params.id, owner: req.user.username };

    const collectionName = req.body.collectionName;
    const isPrivate = req.body.isPrivate;

    const updateData = {};

    if (collectionName) {
      updateData.collectionName = collectionName;
    }
    if (isPrivate) {
      updateData.isPrivate = isPrivate;
    }

    return collections.updateDetails({ filter, updateData })
      .then(() => {
        return res.status(200)
          .redirect('/');
      })
      .catch((err) => {
        next(err);
      });
  });

  // ADD TO COLLECTION
  router.post(ROUTES.COLLECTIONS.ADD, (req, res, next) => {
    return collections.addToCollection;
  });

  // DELETE
  router.delete(ROUTES.COLLECTIONS.DELETE, (req, res, next) => {
    return collections.delete;
  });

  app.use(ROUTES.COLLECTIONS.ROOT, router);
};

module.exports = collectionsRouter;
