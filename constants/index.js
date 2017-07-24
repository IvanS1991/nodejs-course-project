const constants = {
  PORT: 8000,
  DB_PATH: 'mongodb://localhost:27017/test',
  ROUTES: {
    USERS: {
      ROOT: '/users',
      REGISTER: '/register',
      AUTH: '/auth',
      OWN_PROFILE: '/profile',
      PROFILE: '/profile/:username',
      UPDATE: '/update',
    },
    COLLECTIONS: {
      ROOT: '/collections',
      CREATE: '/create',
      UPDATE: '/update/:id',
      VIEW: '/view/:id',
      ADD: '/add/:id',
      REMOVE: '/remove/:id',
      DELETE: '/delete/:id',
    },
    COMMENTS: {
      ROOT: '/comments',
      CREATE: '/create',
      VIEW: '/view/:id',
      DELETE: '/delete/:id',
    },
    MOVIES: {
      ROOT: '/movies',
      VIEW_ONE: '/view/:id',
      VIEW_SOME: '/view',
      UPDATE: '/update',
    },
  },
  MOVIE_META: {
    PAGES: 4,
    GENRES: ['action', 'sci-fi', 'fantasy',
      'adventure', 'comedy', 'thriller',
      'drama', 'romance', 'animation'],
  },
};

module.exports = constants;
