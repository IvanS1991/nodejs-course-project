const express = require('express');
const app = express();

const { PORT } = require('../constants');
const routers = require('./routers');
const middlewares = require('./middleware');

const attach = (data, root) => {
  const passport = require('./passport.config')(data);

  app.set('view engine', 'pug');

  app.use('/', express.static('../public'));
  app.use('/lib', express.static('../node_modules'));

  middlewares(app, passport);
  routers(app, data, passport);
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

  return app;
};

module.exports = attach;
