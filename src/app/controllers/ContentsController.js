const Auth = require('../models/Auth');
const Content = require('../models/Content');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');

class ContentsController {
    index(req, res, next) {
        var username;
        Auth.find( { _id: req.cookies.userId} ).lean()
            .then(auth => {
                if (auth){
                    username = auth
                }
            })
            .catch()
        Content.find().sort({ '_id':-1 }).lean()
            .then(contents => {
                res.render('home', { 
                    contents: contents,
                    username: username
                });
            })
            .catch(next)
    }
    upload(req, res, next){
        res.render('upload');
    }
    lupload(req, res, next){
        req.body.avatar = req.file.path.split("\\").slice(1).join("/");
        var i = {
            name: req.body.name,
            author: req.body.author,
            con: req.body.con,
            avatar: req.body.avatar,
            poster: req.cookies.userId
        }
        const content = Content(i);
        content.save()
            .then(() => res.redirect('/auths/show'))
    }
    estored(req, res, next){
        Content.find({ poster: req.cookies.userId }).sort({ '_id':-1 })
            .then(contents => res.render('estored', {
                contents: mutipleMongooseToObject(contents)
            }))
            .catch(next);
    }
    edit(req, res, next){
        Content.findById(req.params.id)
            .then(contents => res.render('edit', {
                contents: mongooseToObject(contents)
            }))
            .catch(next);
    }
    update(req, res, next){
        var ii = {};
        if (req.files){
            req.body.avatar = req.file.path.split("\\").slice(1).join("/");
            ii = {
                name: req.body.name,
                author: req.body.author,
                con: req.body.con,
                avatar: req.body.avatar,
                poster: req.cookies.userId
            }
        }else {
            ii = {
                name: req.body.name,
                author: req.body.author,
                con: req.body.con,
                avatar: req.body.ii,
                poster: req.cookies.userId
            }
        }

        Content.updateOne({ _id: req.params.id }, ii)
            .then(() => res.redirect('estored'))
            .catch(next);
        
    }
    destroy(req, res, next){
        Content.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    trash(req, res, next){
        Content.findDeleted({ poster: req.cookies.userId }).sort({ '_id':-1 })
            .then(contents => res.render('trash', {
                contents: mutipleMongooseToObject(contents)
            }))
            .catch(next);
    }
    restore(req, res, next){
        Content.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    forceDestroy(req, res, next){
        Content.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    showDetail(req, res, next){
        Content.findOne( { slug: req.params.slug })
            .then(content => res.render('showDetail', {
                content: mongooseToObject(content)
            }))
    }
}

module.exports = new ContentsController;