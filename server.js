const { PORT, DB_PATH } = require('./constants');

Promise.resolve()
  .then(() => {
    return require('./db')(DB_PATH);
  })
  .then((db) => {
    const data = require('./data')(db);
    const controllers = require('./controllers')(data);
    return require('./app')(data, controllers);
  })
  .then((options) => {
    const { server } = options;
    return server.listen(PORT, null, null, () => {
      console.log(`Listening on :${PORT}...`);
    });
  });
