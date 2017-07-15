const { parseTime } = require('../utils');

const collectionModel = (options) => {
  class CollectionModel {
    constructor(title, content) {
      this.title = title;
      this.content = content;
      this.created = parseTime(new Date());
    }
  }

  return new CollectionModel(options.title, options.content);
};

module.exports = collectionModel;
