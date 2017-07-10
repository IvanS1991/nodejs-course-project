const { Router } = require('express');
const { ROUTES } = require('../../constants');

const userRouter = (app, data) => {
  const { users } = data;
  const router = new Router();

  router.post(ROUTES.USERS.REGISTER, (req, res) => {
    return users.register(req, res)
      .then((newReg) => {
        res.status(200)
          .json(newReg);
      })
      .catch((err) => {
        throw err;
      });
  });

  router.put(ROUTES.USERS.AUTH, (req, res) => {
    return users.auth(req, res)
      .then((authKey) => {
        return res.status(200)
          .json({
            authKey,
          });
      })
      .catch((err) => {
        throw err;
      });
  });

  router.get(ROUTES.USERS.PROFILE, (req, res) => {
    return users.profile(req, res)
      .then((match) => {
        return res.status(200)
          .json(match);
      })
      .catch((err) => {
        throw err;
      });
  });

  router.get(ROUTES.USERS.OWN_PROFILE, (req, res) => {
    return users.profile(req, res)
      .then((match) => {
        return res.status(200)
          .json(match);
      })
      .catch((err) => {
        throw err;
      });
  });

  router.put(ROUTES.USERS.UPDATE, (req, res) => {
    return users.update(req, res)
      .then((newData) => {
        return res.status(200)
          .json(newData);
      })
      .catch((err) => {
        throw err;
      });
  });

  app.use(ROUTES.USERS.ROOT, router);
};

module.exports = userRouter;
