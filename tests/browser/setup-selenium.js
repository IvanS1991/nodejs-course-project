const webdriver = require('selenium-webdriver');
const { By, until } = webdriver;
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

const getDriver = () => {
    const driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();

    return driver;
};

const constants = {
    id: {
        btnLogin: 'btn-login',
        btnReg: 'btn-register',
        btnLogout: 'btn-logout',
        btnProfile: 'btn-profile',
        btnUserLogin: 'btn-user-login',
        btnUserReg: 'btn-user-register',
        tbName: 'tb-username',
        tbPass: 'tb-password',
        tbPassRep: 'tb-password-repeat',
        profileUser: 'profile-username',
        btnColCreate: 'btn-collection-create',
        tbColCreate: 'tb-collection-name',
        cbColPrivate: 'cb-collection-private',
        btnColSubmit: 'btn-collection-submit',
        btnCollPreview: 'btn-collection-collapse-1',
        btnNavMovies: 'btn-nav-movies',
        btnMovieAction: 'cb-movie-1',
        btnMoviesFilter: 'btn-movies-filter',
        btnCollAddDisplay: 'btn-add-form-display-1',
        btnCollSelect: 'select-collection-name-1',
        btnCollOption: 'collection-1',
        btnCollAdd: 'btn-movie-add',
        collMoviesCount: 'collection-movies-count-1',
        btnFirstMovie: 'btn-movie-1',
        tbCommentContent: 'tb-comment-content',
        btnCommentCreate: 'btn-comment-create',
        btnMovieComments: 'btn-movie-comments',
    },
    title: {
        profileTitle: 'User profile',
        homeTitle: 'Home',
        errTitle: 'Error',
        collCreateTitle: 'Create collection',
        moviesBrowseTitle: 'Browse movies',
        moviesActionTitle: 'Movies-Action',
    },
    expected: {
        movieCount: 'Movies: 1',
        commentCount: 'Comments   (1)',
    },
    url: 'http://localhost:8808',
    timeout: 5000,
};

module.exports = {
    constants,
    getDriver,
    By,
    until,
};
