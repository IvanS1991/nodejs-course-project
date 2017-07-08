const collectionModel = (options) => {
  class CollectionModel {
    constructor(author, title, content) {
      this.author = author;
      this.title = title;
      this.content = content;
    }
  }

  return new CollectionModel(options.author, options.title, options.content);
};

module.exports = collectionModel;
