const { userModel } = require('../models');

const { validation } = require('../utils/');
const { isInvalidUsername } = validation();

const userController = (data) => {
  const { users } = data;
  class UserController {
    register(req, res, next) {
      const userData = req.body;

      if (userData.password !== userData.passRepeat) {
        return next('Passwords must match!');
      }

      if (isInvalidUsername(userData.username)) {
        return next(`Username must be between 2 and 20 symbols long!`);
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
            return res.status(302)
              .redirect('/users/profile');
          });
        })
        .catch((err) => {
          next(err);
        });
    }

    login(req, res, next) {
      return res.status(302)
        .redirect('/users/profile');
    }

    profile(req, res, next) {
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
    }

    ownProfile(req, res, next) {
      if (!req.user) {
        return next('You have to be logged in for that!');
      }

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
    }

    update(req, res, next) {
      if (!req.user) {
        return next('You have to be logged in for that!');
      }

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
    }
  }

  return new UserController();
};

module.exports = userController;
