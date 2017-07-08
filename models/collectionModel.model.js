const collectionModel = (options) => {
  class CollectionModel {
    constructor(collectionName) {
      this.collectionName = collectionName;
      this.movies = [];
    }
  }

  return new CollectionModel(options.collectionName);
};

module.exports = collectionModel;
