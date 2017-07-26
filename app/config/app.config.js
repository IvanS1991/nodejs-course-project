/* globals __dirname */

const express = require('express');
const path = require('path');

const app = express();

const routers = require('../routers');
const middlewares = require('./middleware.config');
const twitter = require('./twitter.config');
const { errorHandler } = require('../../utils');

const attach = (data, root) => {
  const passport = require('./passport.config')(data);

  app.set('view engine', 'pug');

  app.use('/', express.static(path.join(__dirname, '../../public')));
  app.use('/lib', express.static(path.join(__dirname, '../../node_modules')));

  middlewares(app, passport);
  routers(app, data, passport);

  app.use(errorHandler);

  const server = require('http').createServer(app);

  twitter(server);

  return server;
};

module.exports = attach;
