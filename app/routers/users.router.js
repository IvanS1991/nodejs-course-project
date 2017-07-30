const { Router } = require('express');
const { ROUTES } = require('../../constants');

const usersRouter = (app, controllers, passport) => {
  const { users } = controllers;
  const router = new Router();

  // REGISTER
  router.post(ROUTES.USERS.REGISTER, users.register);

  // LOGIN
  router.post(ROUTES.USERS.AUTH, passport.authenticate('local'), users.login);

  // VIEW PROFILE
  router.get(ROUTES.USERS.PROFILE, users.profile);

  // VIEW OWN PROFILE
  router.get(ROUTES.USERS.OWN_PROFILE, users.ownProfile);

  // UPDATE USER DETAILS
  router.post(ROUTES.USERS.UPDATE, users.update);

  app.use(ROUTES.USERS.ROOT, router);
};

module.exports = usersRouter;
