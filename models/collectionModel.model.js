const { getKey, parseTime } = require('../utils');

const collectionModel = (options) => {
  if (!options.collectionName) {
    throw new Error('collection must have name');
  }
  class Collection {
    constructor(collectionName) {
      this.collectionName = collectionName;
      this.id = getKey('coll');
      this.movies = [];
      this.created = parseTime(new Date());
    }
  }

  return new Collection(options.collectionName);
};

module.exports = collectionModel;
