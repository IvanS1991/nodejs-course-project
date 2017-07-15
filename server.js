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
  .catch((err) => {
    throw err;
  });
