const express = require('express');

const app = express();

const routers = require('../routers');
const middlewares = require('./middleware.config');
const twitter = require('./twitter.config');
const { errorHandler } = require('../../utils');

const attach = (data, controllers, root) => {
  const passport = require('./passport.config')(data);

  app.set('view engine', 'pug');

  app.use('/', express.static('public'));
  app.use('/lib', express.static('node_modules'));
  app.use('/coverage', express.static('coverage/lcov-report'));

  middlewares(app, passport);
  routers(app, controllers, passport);

  app.use(errorHandler);

  const server = require('http').createServer(app);

  twitter(server);

  return server;
};

module.exports = attach;
