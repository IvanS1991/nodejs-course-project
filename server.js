const { PORT, DB_PATH } = require('./constants');

Promise.resolve()
  .then(() => {
    return require('./db')(DB_PATH);
  })
  .then((db) => {
    return require('./data')(db);
  })
  .then((data) => {
    return require('./app')(data);
  })
  .then((server) => {
    return server.listen(PORT, null, null, () => {
      console.log(`Listening on ${PORT}`);
    });
  });
