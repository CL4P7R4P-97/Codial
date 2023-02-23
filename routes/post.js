const express = require('express');
const passport = require('passport');


const router = express.Router();

 
const postController = require('../controllers/postController');


router.post('/create', passport.checkAuthentication, postController.create);
router.post('/comment/:id',passport.checkAuthentication, postController.comment);
router.get('/deletePost/:id',passport.checkAuthentication, postController.deletePost);
router.get('/deleteComment/:id',passport.checkAuthentication, postController.deleteComment);
module.exports = router;