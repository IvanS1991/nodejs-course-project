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
    },
};

module.exports = constants;
