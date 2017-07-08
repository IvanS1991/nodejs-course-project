const mongo = require('mongodb');
const assert = require('assert');

const models = require('../models');
const { DB_PATH } = require('../constants');

const users = (() => {
    class UsersController {
        register(req, res) {
            const userData = req.body;
            const user = models.userModel(userData);

            mongo.connect(DB_PATH, (connectErr, db) => {
                assert.equal(null, connectErr);

                new Promise((resolve, reject) => {
                    db.collection('users')
                        .find({ username: user.username })
                        .toArray((findErr, match) => {
                            assert.equal(null, findErr);

                            if (match.length > 0) {
                                db.close();
                                return reject('Existing user');
                            }

                            db.collection('users')
                                .insertOne(user, (insertErr, result) => {
                                    assert.equal(null, insertErr);
                                    db.close();
                                    return resolve('OK');
                            });
                            return 0;
                        });
                })
                .then((msg) => {
                    res.status(200)
                        .json(msg);
                })
                .catch((error) => {
                    res.status(404)
                        .json(error);
                });
            });
        }

        auth(req, res) {
            const userData = req.body;
            mongo.connect(DB_PATH, (connectErr, db) => {
                assert.equal(null, connectErr);

                new Promise((resolve, reject) => {
                    db.collection('users')
                        .find({
                            username: userData.username,
                            passHash: userData.passHash,
                        })
                        .toArray((findErr, match) => {
                            assert.equal(null, findErr);

                            if (match.length === 0) {
                                db.close();
                                return reject('Wrong username or password');
                            }

                            db.close();
                            return resolve(match[0].authKey);
                        });
                })
                .then((result) => {
                    res.status(200)
                        .json(result);
                })
                .catch((error) => {
                    res.status(404)
                        .json(error);
                });
            });
        }

        profile(req, res) {

        }

        update(req, res) {

        }
    }

    return new UsersController();
})();

module.exports = users;
