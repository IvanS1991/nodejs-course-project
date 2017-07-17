const fs = require('fs');
const path = require('path');
const _ = require('lodash');

// Loads all modules that match a certain pattern
const loader = (dir, filter, ...dependencies) => {
  const output = {};

  _(fs.readdirSync(dir))
    .filter((file) => {
      return file.search(filter) >= 0;
    })
    .forEach((file) => {
      const filePath = path.join(dir, file);
      const dotIndex = file.indexOf('.');
      const label = file.slice(0, dotIndex);
      if (dependencies.length > 0) {
        output[label] = require(filePath)(...dependencies);
      } else {
        output[label] = require(filePath);
      }
    });

  return output;
};

module.exports = loader;

