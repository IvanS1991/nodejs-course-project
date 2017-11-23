const { PORT, DB_PATH } = require('./constants');
const process = require('process');

const port = process.env.PORT || PORT;

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
    return server.listen(port, null, null, () => {
      console.log(`Listening on :${port}...`);
    });
  });
