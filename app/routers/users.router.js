const { Router } = require('express');

const userRouter = (app, data) => {
    const { users } = data;
    const router = new Router();

    router.get('/', users.works);

    app.use('/users', router);
};

module.exports = userRouter;
