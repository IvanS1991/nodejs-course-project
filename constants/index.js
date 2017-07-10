const constants = {
  PORT: 8000,
  DB_PATH: 'mongodb://localhost:27017/test',
  ROUTES: {
    USERS: {
      ROOT: '/api/users',
      REGISTER: '/register',
      AUTH: '/auth',
      OWN_PROFILE: '/profile',
      PROFILE: '/profile/:id',
      UPDATE: '/update',
    },
    COLLECTIONS: {
      ROOT: '/api/collections',
      CREATE: '/create',
      UPDATE: '/update/:id',
      VIEW: '/view/:id',
      DELETE: '/delete/:id',
    },
    COMMENTS: {
      ROOT: '/api/comments',
      CREATE: '/create',
      VIEW: '/view/:id',
      DELETE: '/delete/:id',
    },
    MOVIES: {
      ROOT: '/api/movies',
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
