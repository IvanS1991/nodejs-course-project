const { PORT } = require('../constants');
const routers = require('./routers');
const middlewares = require('./middleware');

const attach = (app, data, root) => {
  middlewares(app, root);
  routers(app, data);
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

module.exports = attach;
