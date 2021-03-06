const { getKey, parseTime } = require('../utils');

const collectionModel = (options) => {
  if (!options.collectionName) {
    throw new Error('Collection must have name and isPrivate!');
  }
  class Collection {
    constructor(collectionName, isPrivate) {
      this.collectionName = collectionName;
      this.isPrivate = isPrivate === 'on' ? true : false;
      this.id = getKey('coll');
      this.movies = [];
      this.created = parseTime(new Date());
    }
  }

  return new Collection(options.collectionName, options.isPrivate);
};

module.exports = collectionModel;
