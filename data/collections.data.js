const collections = (database) => {
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
