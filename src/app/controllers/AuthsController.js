const Auth = require('../models/Auth');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class AuthsController {
    signup(req, res, next) {
        res.render('signup')
    }
    store(req, res, next) {
        var loi = ''
        Auth.findOne({ email: req.body.email })
            .exec((err, auth) => {
                if (auth){
                    return res.render('signup', {
                        loi: "Tài khoản đã tồn tại",
                    });
                }
            })
        const auth = Auth(req.body);
        auth.save()
            .then(() => res.redirect('/auths/login'))
    }
    login(req, res, next) {
        res.render('login')
    }
    lstore(req, res, next) {
        var loi = '';
        if (!req.body.email){
            return res.render('login', {
                loi: "Không được bỏ trống trường email"
            });
        }
        if (!req.body.password){
            return res.render('login', {
                loi: "Không được bỏ trống trường password"
            });
        }
        Auth.findOne({email: req.body.email})
            .exec((err, auth) => {

                if (!auth) {
                    return res.render('login', {
                        loi: "Tài khoản không tồn tại",
                    });
                }

                if (auth.password != req.body.password){
                    return res.render('login', {
                        loi: "Bạn nhập sai mật khẩu",
                    });
                }

                res.cookie('userId', auth.id);
                res.redirect('/auths/show');
            })
        }
    show(req, res, next) {
        Auth.find({ _id: req.cookies.userId })
            .then(auths => {
                if (auths){
                    auths.forEach(auth => {
                        res.render('show', {
                            names: auth.name
                        })
                    })
                }
            })
        //res.render('show')
    }    

    logout(req, res, next) {
        res.clearCookie("userId");
        res.redirect('/auths/login');
    }

    }

module.exports = new AuthsController;