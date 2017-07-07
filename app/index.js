const { PORT } = require('./constants');
const routers = require('./routers');
const data = require('./data');
const middlewares = require('./middleware');

const attach = (app, root) => {
    middlewares(app, root);
    routers(app, data);
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
};

module.exports = attach;
