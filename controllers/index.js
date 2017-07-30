/* globals __dirname */

const { loader } = require('../utils');

const controllers = (data) => {
  return loader(__dirname, '.controller.js', data);
};

module.exports = controllers;
