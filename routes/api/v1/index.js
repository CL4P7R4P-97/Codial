const express = require('express');

const router = express.Router();




router.use('/posts', require('./post'));
router.use('/users', require('./users_api'));


module.exports = router;