const dbPath = require('../../constants/').TEST.DB_PATH;

const getApp = () => {
  return Promise.resolve()
    .then(() => {
      return require('../../db')(dbPath);
    })
    .then((db) => {
      const data = require('../../data')(db);
      const controllers = require('../../controllers/')(data);
      return require('../../app')(data, controllers);
    });
};

const constants = {
  contentHTML: 'text/html; charset=utf-8',
  contentFormData: 'application/x-www-form-urlencoded',
  code: {
    OK: 200,
    REDIRECT: 302,
    ERR: 404,
  },
};

const getRoute = (prefix) => {
  prefix = prefix === '/' ? '' : prefix;
  return (suffix) => {
    suffix = suffix || '';
    return prefix + suffix;
  };
};

module.exports = {
  getApp,
  getRoute,
  constants,
};

