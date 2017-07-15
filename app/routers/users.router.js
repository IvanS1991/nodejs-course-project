const { Router } = require('express');
const { ROUTES } = require('../../constants');

const { userModel } = require('../../models');

const usersRouter = (app, data, passport) => {
  const { users } = data;
  const router = new Router();

  // REGISTER
  router.post(ROUTES.USERS.REGISTER, (req, res) => {
    const userData = req.body;
    const user = userModel({
      username: userData.username,
      passHash: userData.password,
    });

    return users.register(user)
      .then((newUser) => {
        req.login(newUser, (err) => {
          if (err) {
            throw err;
          }
          return res.redirect('/');
        });
      })
      .catch((err) => {
        return res.status(404)
          .json(err);
      });
  });

  // LOGIN
  router.post(ROUTES.USERS.AUTH, passport.authenticate('local'), (req, res) => {
    res.redirect('/');
  });

  // VIEW PROFILE
  router.get(ROUTES.USERS.PROFILE, (req, res) => {
    const id = req.params.id;
    const filter = { id };

    return users.profile(filter)
      .then((match) => {
        return res.status(200)
          .json(match);
      })
      .catch((err) => {
        return res.status(404)
          .json(err);
      });
  });

  // VIEW OWN PROFILE
  router.get(ROUTES.USERS.OWN_PROFILE, (req, res) => {
    const filter = { authKey: req.user.authKey };

    return users.profile(filter)
      .then((match) => {
        return res.render('profile', {
          context: match,
        });
      })
      .catch((err) => {
        return res.status(404)
          .json(err);
      });
  });

  // UPDATE USER DETAILS
  router.post(ROUTES.USERS.UPDATE, (req, res) => {
    const newData = req.body;
    const filter = { authKey: req.user.authKey };

    return users.update({
      filter,
      data: newData,
    })
      .then((updateData) => {
        return res.status(200)
          .json(updateData);
      })
      .catch((err) => {
        return res.status(404)
          .json(err);
      });
  });

  app.use(ROUTES.USERS.ROOT, router);
};

module.exports = usersRouter;
