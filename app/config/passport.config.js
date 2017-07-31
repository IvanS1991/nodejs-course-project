const passport = require('passport');
const LocalStrat = require('passport-local');

const attach = (data) => {
  const { users } = data;

  passport.use(new LocalStrat((username, passHash, done) => {
    users.findByUsername(username)
      .then((user) => {
        if (!user || user.passHash !== passHash) {
          done('Wrong username or password!', null);
        }
        done(null, user);
      });
  }));

  passport.serializeUser((user, done) => {
    return users.getNewAuthKey(user)
      .then((match) => {
        if (!match) {
          done('You have to be logged in for that!', null);
        }
        done(null, match.authKey);
      });
  });

  passport.deserializeUser((authKey, done) => {
    if (!authKey) {
      return done('You are not logged in!', null);
    }
    return users.findByAuthKey(authKey)
      .then((user) => {
        done(null, user);
      });
  });

  return passport;
};

module.exports = attach;
