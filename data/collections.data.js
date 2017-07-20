const collections = (database) => {
  const moviesData = database('movies');
  const collectionsData = database('collections');

  class CollectionsData {
    create(collection) {
      return collectionsData.insertOne(collection);
    }

    view(options) {
      const { filter, user } = options;

      return collectionsData.findOne(filter)
        .then((match) => {
          if (!match) {
            return Promise.reject('no such collection');
          }
          if (match.isPrivate) {
            if (match.owner !== user.username) {
              return Promise.reject('this is a private collection');
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
              .reject('you are not the owner of this collection or it does not exist');
          }
          return match;
        });
    }

    addToCollection(options) {
      const { user, collectionId, movieId } = options;

      return moviesData.findOne({ id: movieId })
        .then((movie) => {
          console.log(movie);
          return collectionsData.updatePush({
            owner: user.username,
            id: collectionId,
          },
            {
              movies: movie,
            });
        });
    }

    removeFromCollection(options) {
      const { collectionId, movieId } = options;

      return collectionsData.updatePull({
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
