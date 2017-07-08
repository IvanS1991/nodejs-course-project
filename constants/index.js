const constants = {
  PORT: 8000,
  DB_PATH: 'mongodb://localhost:27017/test',
  ROUTES: {
    USERS: {
      ROOT: '/api/users',
      REGISTER: '/register',
      AUTH: '/auth',
      PROFILE: '/profile',
      UPDATE: '/update',
    },
    COLLECTIONS: {
      ROOT: '/api/collections',
      CREATE: '/create',
      UPDATE: '/:id/update',
      VIEW: '/:id/view',
      DELETE: '/:id/delete',
    },
    COMMENTS: {
      ROOT: '/api/comments',
      CREATE: '/create',
      VIEW: '/:id/view',
      DELETE: '/:id/delete',
    },
  },
};

module.exports = constants;
