const app = require('express')();

const { PORT } = require('../constants');
const routers = require('./routers');
const middlewares = require('./middleware');

const attach = (data, root) => {
  const passport = require('./passport.config')(data);

  app.set('view engine', 'pug');

  middlewares(app, passport);
  routers(app, data, passport);
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

  return app;
};

module.exports = attach;
