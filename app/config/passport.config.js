const passport = require('passport');
const LocalStrat = require('passport-local');

const attach = (data) => {
  const { users } = data;

  passport.use(new LocalStrat((username, password, done) => {
    users.findByUsername(username)
      .then((user) => {
        if (!user) {
          done('no such user', null);
        }
        if (user.passHash !== password) {
          done('wrong password', null);
        }
        done(null, user);
      });
  }));

  passport.serializeUser((user, done) => {
    return users.getNewAuthKey(user)
      .then((result) => {
        done(null, result.authKey);
      });
  });

  passport.deserializeUser((authKey, done) => {
    return users.findByAuthKey(authKey)
      .then((user) => {
        done(null, user);
      });
  });

  return passport;
};

module.exports = attach;
