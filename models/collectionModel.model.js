const { getKey, parseTime, validation } = require('../utils');

const collectionModel = (options) => {
  if (!options.collectionName) {
    throw new Error('collection must have name');
  }
  class Collection {
    constructor(collectionName) {
      if(validation.validateLength(collectionName, 3, 30)){
        throw new Error('collection name must be between 3 and 30 symbols');
      }
      this.collectionName = collectionName;
      this.id = getKey('coll');
      this.movies = [];
      this.created = parseTime(new Date());
    }
  }

  return new Collection(options.collectionName);
};

module.exports = collectionModel;
