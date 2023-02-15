const express = require('express');

const router = express.Router();

 
const userController = require('../controllers/userController');

console.log("router loaded");
router.get('/profile', userController.profile );
router.get('/edit', userController.edit);


//login
router.get('/login', userController.login);
router.post('/create-session', userController.createSession);

//signup
router.get('/signup', userController.signup);
router.post('/create-user', userController.createUser);


module.exports  = router;