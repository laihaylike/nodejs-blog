const express = require('express');
const router = express.Router();

const authsController = require('../app/controllers/AuthsController');
const authsMiddleware = require('../app/middlewares/AuthsMiddleware');

router.get('/signup', authsController.signup);
router.post('/store', authsController.store);
router.get('/login', authsController.login);
router.post('/lstore', authsController.lstore);
router.get('/logout', authsController.logout);
router.get('/show', authsMiddleware.requireAuth, authsController.show);

module.exports = router;