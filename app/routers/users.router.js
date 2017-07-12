const { Router } = require('express');
const { ROUTES } = require('../../constants');

const { userModel } = require('../../models');

const usersRouter = (app, data) => {
  const { users } = data;
  const router = new Router();

  // REGISTER
  router.post(ROUTES.USERS.REGISTER, (req, res) => {
    const userData = req.body;
    const user = userModel(userData);

    return users.register(user)
      .then((newUser) => {
        return res.status(200)
          .json({
            authKey: newUser.authKey,
          });
      })
      .catch((err) => {
        return res.status(404)
          .json(err);
      });
  });

  // LOGIN
  router.put(ROUTES.USERS.AUTH, (req, res) => {
    const { username, passHash } = req.body;
    const filter = { username, passHash };

    return users.auth(filter)
      .then((authKey) => {
        return res.status(200)
          .json(authKey);
      })
      .catch((err) => {
        return res.status(404)
          .json(err);
      });
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
    const filter = { authKey: req.headers['x-authkey'] };

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

  // UPDATE USER DETAILS
  router.put(ROUTES.USERS.UPDATE, (req, res) => {
    const authKey = req.headers['x-authkey'];
    if (!authKey) {
      return res.status(404)
        .json('couldnt authorize user');
    }
    const newData = req.body;
    const filter = { authKey: req.headers['x-authkey'] };

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
