const express = require('express');
const multer = require('multer');
const router = express.Router();
const authsMiddleware = require('../app/middlewares/AuthsMiddleware');

const contentsController = require('../app/controllers/ContentsController');

var upload = multer({ dest: './public/uploads/' })

router.get('/upload', authsMiddleware.requireAuth, contentsController.upload);
router.post('/lupload', upload.single('avatar'), contentsController.lupload);
router.get('/estored', authsMiddleware.requireAuth, contentsController.estored);
router.get('/:id/edit', authsMiddleware.requireAuth, contentsController.edit);
router.put('/:id', upload.single('avatar'), contentsController.update);
router.delete('/:id', contentsController.destroy);
router.delete('/:id/force', contentsController.forceDestroy);
router.patch('/:id/restore', contentsController.restore);
router.get('/trash', authsMiddleware.requireAuth, contentsController.trash);
router.get('/:slug', contentsController.showDetail);
router.get('/', contentsController.index);

module.exports = router;