const express = require('express');
const passport = require('passport');


const router = express.Router();

 
const userController = require('../controllers/userController');

console.log("router loaded");
router.get('/profile/:id',passport.checkAuthentication, userController.profile );
router.get('/edit', userController.edit);


//login
router.get('/login', userController.login);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/user/login'}
),userController.createSession);

//signup
router.get('/signup', userController.signup);
router.post('/create-user',userController.createUser);

//logout
router.get('/logout',userController.destroySession);

//getting usersList

router.get('/profile/:userId', passport.checkAuthentication, userController.otherUserProfile);


//updating profile 

router.post('/profile/udpate/:userId', passport.checkAuthentication, userController.updateProfile);

module.exports  = router;