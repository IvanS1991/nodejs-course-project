const { Router } = require('express');
const { ROUTES } = require('../../constants');

const { userModel } = require('../../models');

const userRouter = (app, data) => {
  const { users } = data;
  const router = new Router();

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

  router.put(ROUTES.USERS.AUTH, (req, res) => {
    const { username, passHash } = req.body;
    const filter = { username, passHash };

    return users.auth(filter)
      .then((authKey) => {
        return res.status(200)
          .json(authKey);
      })
      .catch((err) => {
        throw err;
      });
  });

  router.get(ROUTES.USERS.PROFILE, (req, res) => {
    const id = req.params.id;
    let filter = { authKey: req.headers['x-authkey'] };
    if (id) {
      filter = { userId: id };
    }

    return users.profile(filter)
      .then((match) => {
        return res.status(200)
          .json(match);
      })
      .catch((err) => {
        throw err;
      });
  });

  router.get(ROUTES.USERS.OWN_PROFILE, (req, res) => {
    const id = req.params.id;
    let filter = { authKey: req.headers['x-authkey'] };
    if (id) {
      filter = { userId: id };
    }

    return users.profile(filter)
      .then((match) => {
        return res.status(200)
          .json(match);
      })
      .catch((err) => {
        throw err;
      });
  });

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
        throw err;
      });
  });

  app.use(ROUTES.USERS.ROOT, router);
};

module.exports = userRouter;
