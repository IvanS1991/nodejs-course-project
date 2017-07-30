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
      ADD: '/add',
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
    MISC: {
      ROOT: '/',
      ABOUT: '/about',
      LOGIN: '/login',
      REGISTER: '/register',
      LOGOUT: '/logout',
      MOVIES: '/movies',
      NEW_COLLECTION: '/collections/new',
    },
  },
  MOVIE_META: {
    PAGES: 4,
    GENRES: [
      'action',
      'animation',
      'adventure',
      'comedy',
      'drama',
      'fantasy',
      'sci-fi',
      'thriller',
      'romance',
    ],
  },
  TWITTER_KEYWORDS: [
    '#imdb',
    '#rottentomatoes',
    '#movienews',
    '#hollywood',
    '#nodejs',
    '#javascript',
  ],
};

module.exports = constants;
