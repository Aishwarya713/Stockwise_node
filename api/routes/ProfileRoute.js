const checkAuth = require('../middleware/check-auth');
const express = require('express');
const router = express.Router();

const ProfileControllers = require('../controllers/ProfileController');

router.get('/getProfile',checkAuth,ProfileControllers.getProfile)
router.post('/updateProfile',checkAuth,ProfileControllers.updateProfile)

module.exports = router; 