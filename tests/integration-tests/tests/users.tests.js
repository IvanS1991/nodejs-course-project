const request = require('supertest');
const { getApp, getRoute, constants } = require('../setup-supertest');

const { contentHTML, contentFormData, code } = constants;

const { ROUTES } = require('../../../constants/');

const root = getRoute(ROUTES.USERS.ROOT);

describe('User tests:', () => {
  const username = 'pesho' + Math.floor(Math.random() * 1000000);
  const password = 'asd123';
  const password2 = 'dsa123';

  describe('register:', () => {
    const route = root(ROUTES.USERS.REGISTER);

    it('expect code 404 if incorrect data is sent', (done) => {
      getApp()
        .then((app) => {
          request(app)
            .post(route)
            .set('Content-Type', contentFormData)
            .send({ username: username })
            .send({ password: password })
            .send({ passRepeat: password2 })
            .expect(code.ERR)
            .expect('Content-Type', contentHTML)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              return done();
            });
        });
    });

    it('expect redirect with code 302 if correct data is sent', (done) => {
      getApp()
        .then((app) => {
          request(app)
            .post(route)
            .set('Content-Type', contentFormData)
            .send({ username: username })
            .send({ password: password })
            .send({ passRepeat: password })
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

  describe('login:', () => {
    const route = root(ROUTES.USERS.AUTH);

    it('expect code 404 if user does not exist', (done) => {
      getApp()
        .then((app) => {
          request(app)
            .post(route)
            .set('Content-Type', contentFormData)
            .send({ username: 'krqwebkrkqwekporw' })
            .send({ password: 'geqgemiwqimqwrinqpwm' })
            .expect(code.ERR)
            .expect('Content-Type', contentHTML)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              return done();
            });
        });
    });

    it('expect redirect with code 302 if correct data is sent', (done) => {
      getApp()
        .then((app) => {
          request(app)
            .post(route)
            .set('Content-Type', contentFormData)
            .send({ username: username })
            .send({ password: password })
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

  describe('profile:', () => {
    const route = root(ROUTES.USERS.PROFILE);

    it('expect code 404 (private route)', (done) => {
      getApp()
        .then((app) => {
          request(app)
            .get(route)
            .expect(code.ERR)
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

  describe('update:', () => {
    const route = root(ROUTES.USERS.UPDATE);

    it('expect code 404 (private route)', (done) => {
      getApp()
        .then((app) => {
          request(app)
            .post(route)
            .expect(code.ERR)
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
