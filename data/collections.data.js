const collections = (database) => {
  const usersData = database('users');

  class CollectionsData {
    create(req, res) {
      res.json('create collection');
    }

    view(req, res) {
      const id = req.params.id;
      res.json('view collection ' + id);
    }

    update(req, res) {
      const id = req.params.id;
      res.json('update collection ' + id);
    }

    delete(req, res) {
      const id = req.params.id;
      res.json('delete collection ' + id);
    }
  }

  return new CollectionsData(database);
};

module.exports = collections;
