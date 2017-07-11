const collectionModel = (options) => {
  class CollectionModel {
    constructor(title, content) {
      this.title = title;
      this.content = content;
    }
  }

  return new CollectionModel(options.title, options.content);
};

module.exports = collectionModel;
