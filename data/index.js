/* globals __dirname */

const { loader } = require('../utils');

const data = (db) => {
  return loader(__dirname, '.data.js', db);
};

module.exports = data;
