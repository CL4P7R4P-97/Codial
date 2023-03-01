const express = require('express');

const router = express.Router();

const passwordController = require('../controllers/forgotPassword');

router.get('/resetPage', passwordController.resetPage);
router.post('/sendEmail', passwordController.sendLink);
router.get('/finalReset/:token', passwordController.finalReset);
router.post('/resetCompletion/:token', passwordController.completion);




module.exports = router;