const collections = (database) => {
  const usersData = database('users');

  class CollectionsData {
    create(options) {
      const { collection, filter } = options;

      return usersData.updatePush(filter, { collections: collection });
    }

    view(options) {
      const { id, filter } = options;

      return usersData.findOne(filter)
        .then((match) => {
          const result = match.collections
            .find((collection) => {
              return collection.id === id;
            });
          if (!result) {
            return Promise.reject('no such collection');
          }
          return result;
        });
    }

    updateInfo(req, res) {
      const id = req.params.id;
      res.json('update collection ' + id);
    }

    addToCollection(req, res) {

    }

    delete(req, res) {
      const id = req.params.id;
      res.json('delete collection ' + id);
    }
  }

  return new CollectionsData(database);
};

module.exports = collections;
