const contentsRouter = require('./contents');
const authsRouter = require('./auths');

function route(app) {
    app.use('/auths', authsRouter);
    app.use('/', contentsRouter);
}

module.exports = route;