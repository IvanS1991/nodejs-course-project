const collections = (database) => {
  const moviesData = database('movies');
  const collectionsData = database('collections');

  class CollectionsData {
    create(collection) {
      return collectionsData.insertOne(collection);
    }

    all() {
      return collectionsData.findMany({ isPrivate: false });
    }

    view(options) {
      const { filter, user } = options;

      return collectionsData.findOne(filter)
        .then((match) => {
          if (!match) {
            return Promise.reject('Non-existing collection!');
          }
          if (match.isPrivate) {
            if (match.owner !== user.username) {
              return Promise.reject('This is a private collection!');
            }
            return match;
          }
          return match;
        });
    }

    updateDetails(options) {
      const { filter, updateData } = options;

      return collectionsData.update(filter, updateData)
        .then((match) => {
          if (!match) {
            return Promise
              .reject('Non-existing collection or you are not its owner!');
          }
          return match;
        });
    }

    addToCollection(options) {
      const { user, collectionName, movieId } = options;

      return moviesData.findOne({ id: movieId })
        .then((movie) => {
          return collectionsData.updatePush({
            owner: user.username,
            collectionName: collectionName,
          },
            {
              movies: movie,
            });
        });
    }

    removeFromCollection(options) {
      const { user, collectionId, movieId } = options;

      return collectionsData.updatePull({
        owner: user.username,
        id: collectionId,
      },
      {
        movies: {
          id: movieId,
        },
      });
    }

    delete(id) {
      return collectionsData.remove({ id: id });
    }
  }

  return new CollectionsData(database);
};

module.exports = collections;
