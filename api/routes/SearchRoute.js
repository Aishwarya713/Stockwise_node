const express = require('express');

const router = express.Router();

const SearchControllers = require('../controllers/SearchController');

router.get('/searchStock',SearchControllers.searchStock)

module.exports = router; 