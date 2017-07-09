const { Router } = require('express');
const { ROUTES } = require('../../constants');

const userRouter = (app, data) => {
  const { users } = data;
  const router = new Router();

  router.post(ROUTES.USERS.REGISTER, users.register);
  router.put(ROUTES.USERS.AUTH, users.auth);
  router.get(ROUTES.USERS.PROFILE, users.profile);
  router.get(ROUTES.USERS.OWN_PROFILE, users.profile);
  router.put(ROUTES.USERS.UPDATE, users.update);

  app.use(ROUTES.USERS.ROOT, router);
};

module.exports = userRouter;
