const Auth = require('../models/Auth');
const { mutipleMongooseToObject } = require('../../util/mongoose');

module.exports.requireAuth = function(req, res, next) {
    if (!req.cookies.userId) {
        res.redirect('/auths/login');
        return;
    }

    Auth.find({ _id: req.cookies.userId })
        .exec()
        .then(auth => {
            if (!auth) {
                res.redirect('/auths/login');
                return;
            }
            next();
        })
        .catch()
}