const { PORT } = require('./constants');

Promise.resolve()
  .then(() => {
    return require('./db');
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
