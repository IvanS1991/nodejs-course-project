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
  .then((app) => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  });
