const mongo = require('mongodb');
const assert = require('assert');

const models = require('../models');
const { DB_PATH } = require('../constants');

const comments = (() => {
  class CommentsController {
    create(req, res) {
      res.json('create comment');
    }

    view(req, res) {
      const id = req.params.id;
      res.json('view comment ' + id);
    }

    delete(req, res) {
      const id = req.params.id;
      res.json('delete comment ' + id);
    }
  }

  return new CommentsController();
})();

module.exports = comments;
