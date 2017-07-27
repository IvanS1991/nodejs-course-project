const { Router } = require('express');
const { ROUTES } = require('../../constants');

const { collectionModel } = require('../../models');

const collectionsRouter = (app, data) => {
  const { collections } = data;
  const router = new Router();

  // VIEW ALL PUBLIC
  router.get('/', (req, res, next) => {
    return collections.all()
      .then((matches) => {
        return res.status(200)
          .render('collections', {
            context: {
              user: req.user || {},
              collections: matches,
            },
          });
      })
      .catch((err) => {
        next(err);
      });
  });

  // VIEW BY ID
  router.get(ROUTES.COLLECTIONS.VIEW, (req, res, next) => {
    const filter = { id: req.params.id };
    const user = req.user;

    return collections.view({ filter, user })
      .then((collection) => {
        return res.status(200)
          .render('collection-detailed', {
            context: {
              user: req.user || {},
              collection,
              isOwner: true,
              inCollection: true,
            },
          });
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
        return res.redirect('/users/profile');
      })
      .catch((err) => {
        next(err);
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
    const user = req.user;
    const collectionName = req.body.collectionName;
    const movieId = parseInt(req.body.movieId, 10);

    return collections.addToCollection({ user, collectionName, movieId })
      .then((result) => {
        return res.status(200)
          .redirect(req.session.lastReferer);
      })
      .catch((err) => {
        next(err);
      });
  });

  // REMOVE FROM COLLECTION
  router.post(ROUTES.COLLECTIONS.REMOVE, (req, res, next) => {
    const user = req.user;
    const collectionId = req.params.id;
    const movieId = parseInt(req.body.movieId, 10);

    return collections.removeFromCollection({ user, collectionId, movieId })
      .then((result) => {
        return res.status(200)
          .redirect(req.session.lastReferer);
      })
      .catch((err) => {
        next(err);
      });
  });

  // DELETE
  router.post(ROUTES.COLLECTIONS.DELETE, (req, res, next) => {
    const collectionId = req.params.id;

    return collections.delete(collectionId)
      .then((result) => {
        return res.status(200)
          .json('deleted collection');
      })
      .catch((err) => {
        next(err);
      });
  });

  app.use(ROUTES.COLLECTIONS.ROOT, router);
};

module.exports = collectionsRouter;
