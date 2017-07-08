const mongo = require('mongodb');
const assert = require('assert');

const models = require('../models');
const { DB_PATH } = require('../constants');

const collections = (() => {
  class CollectionsController {
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

  return new CollectionsController();
})();

module.exports = collections;
