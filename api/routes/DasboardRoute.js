const checkAuth = require('../middleware/check-auth');
const express = require('express');
const router = express.Router();

const DashboardControllers = require('../controllers/DashboardControllers');

router.get('/getDashboard',checkAuth,DashboardControllers.getDashboard)
router.post('/getStockInformation',checkAuth,DashboardControllers.getStockInformation)
router.get('/getAlertType',checkAuth,DashboardControllers.getAlertType)
router.get('/getSubAlertType',checkAuth,DashboardControllers.getSubAlertType)
router.post('/storeAlertData',checkAuth,DashboardControllers.insertAlerts)

module.exports = router; 