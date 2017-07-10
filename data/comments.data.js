const comments = (database) => {
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

  return new CommentsController(database);
};

module.exports = comments;
