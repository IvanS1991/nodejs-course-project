const { Router } = require('express');
const { ROUTES } = require('../../constants');

const { userModel } = require('../../models');

const usersRouter = (app, data, passport) => {
  const { users } = data;
  const router = new Router();

  // REGISTER
  router.post(ROUTES.USERS.REGISTER, (req, res, next) => {
    const userData = req.body;

    if (userData.password !== userData.passRepeat) {
      return next('Passwords must match!');
    }

    const user = userModel({
      username: userData.username,
      passHash: userData.password,
    });

    return users.register(user)
      .then((newUser) => {
        req.login(newUser, (err) => {
          if (err) {
            next(err);
          }
          return res.redirect('/users/profile');
        });
      })
      .catch((err) => {
        next(err);
      });
  });

  // LOGIN
  router.post(ROUTES.USERS.AUTH, passport.authenticate('local'),
    (req, res, next) => {
      return res.redirect('/users/profile');
    });

  // VIEW PROFILE
  router.get(ROUTES.USERS.PROFILE, (req, res, next) => {
    const username = req.params.username;
    const filter = { username };

    return users.profile(filter)
      .then((match) => {
        return res.status(200)
          .render('profile', {
            context: {
              user: req.user || {},
              match,
            },
          });
      })
      .catch((err) => {
        next(err);
      });
  });

  // VIEW OWN PROFILE
  router.get(ROUTES.USERS.OWN_PROFILE, (req, res, next) => {
    const filter = { authKey: req.user.authKey };

    return users.profile(filter)
      .then((match) => {
        return res.render('profile', {
          context: {
            user: req.user || {},
            match: match,
            isOwner: true,
          },
        });
      })
      .catch((err) => {
        next(err);
      });
  });

  // UPDATE USER DETAILS
  router.post(ROUTES.USERS.UPDATE, (req, res, next) => {
    const newData = req.body;

    if (newData.password !== newData.passRepeat) {
      return next('Passwords must match!');
    }

    const filter = { authKey: req.user.authKey };

    return users.update({
      filter,
      data: {
        passHash: newData.password,
      },
    })
      .then((updateData) => {
        return res.status(200)
          .redirect('/users/profile');
      })
      .catch((err) => {
        next(err);
      });
  });

  app.use(ROUTES.USERS.ROOT, router);
};

module.exports = usersRouter;
