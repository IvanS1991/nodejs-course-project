const request = require('supertest');
const { getApp, getRoute, constants } = require('../setup-supertest');

const { contentHTML, code } = constants;

const { ROUTES } = require('../../../constants/');

const root = getRoute('/');

describe('Misc tests:', () => {
  describe('home:', () => {
    const route = root();

    it('expect code 200', (done) => {
      getApp()
        .then((app) => {
          request(app)
            .get(route)
            .expect(code.OK)
            .expect('Content-Type', contentHTML)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              return done();
            });
        });
    });
  });

  describe('movies:', () => {
    const route = root(ROUTES.MISC.MOVIES);

    it('expect code 200', (done) => {
      getApp()
        .then((app) => {
          request(app)
            .get(route)
            .expect(code.OK)
            .expect('Content-Type', contentHTML)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              return done();
            });
        });
    });
  });

  describe('collections:', () => {
    const route = root(ROUTES.COLLECTIONS.ROOT);

    it('expect code 200', (done) => {
      getApp()
        .then((app) => {
          request(app)
            .get(route)
            .expect(code.OK)
            .expect('Content-Type', contentHTML)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              return done();
            });
        });
    });
  });

  describe('login:', () => {
    const route = root(ROUTES.MISC.LOGIN);

    it('expect code 200', (done) => {
      getApp()
        .then((app) => {
          request(app)
            .get(route)
            .expect(code.OK)
            .expect('Content-Type', contentHTML)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              return done();
            });
        });
    });
  });

  describe('logout:', () => {
    const route = root(ROUTES.MISC.LOGOUT);

    it('expect redirect with code 302', (done) => {
      getApp()
        .then((app) => {
          request(app)
            .get(route)
            .expect(code.REDIRECT)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              return done();
            });
        });
    });
  });

  describe('register:', () => {
    const route = root(ROUTES.MISC.REGISTER);

    it('expect code 200', (done) => {
      getApp()
        .then((app) => {
          request(app)
            .get(route)
            .expect(code.OK)
            .expect('Content-Type', contentHTML)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              return done();
            });
        });
    });
  });
});
