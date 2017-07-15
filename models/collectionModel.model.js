const { parseTime } = require('../utils');

const collectionModel = (options) => {
  class CollectionModel {
    constructor(collectionName) {
      this.collectionName = collectionName;
      this.movies = [];
      this.created = parseTime(new Date());
    }
  }

  return new CollectionModel(options.collectionName);
};

module.exports = collectionModel;
