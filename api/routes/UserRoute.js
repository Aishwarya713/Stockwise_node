const express = require('express');

const router = express.Router();

const UserController = require('../controllers/UserController');

router.post('/login',UserController.login);
router.post('/signup',UserController.signup);
router.post('/sendOtp',UserController.sendOtp);
router.post('/verifyOtp',UserController.verifyOtp);

module.exports = router; 