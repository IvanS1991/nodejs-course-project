const { collectionModel } = require('../models');

const { validation } = require('../utils/');
const { isInvalidCollectionName } = validation();

const collectionsController = (data) => {
  const { collections } = data;

  class CollectionsController {
    getAll(req, res, next) {
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
    }

    getById(req, res, next) {
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
    }

    create(req, res, next) {
      const username = req.user.username;
      const collData = req.body;

      if (isInvalidCollectionName(collData.collectionName)) {
        return next('Collection name must be between 1 and 40 symbols long!');
      }

      const collection = collectionModel(collData);
      collection.owner = username;

      return collections.create(collection)
        .then((output) => {
          return res.redirect('/users/profile');
        })
        .catch((err) => {
          next(err);
        });
    }

    update(req, res, next) {
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
    }

    addTo(req, res, next) {
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
    }

    removeFrom(req, res, next) {
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
    }

    delete(req, res, next) {
      const collectionId = req.params.id;

      return collections.delete(collectionId)
        .then((result) => {
          return res.status(200)
            .redirect('/users/profile');
        })
        .catch((err) => {
          next(err);
        });
    }
  }

  return new CollectionsController();
};

module.exports = collectionsController;
