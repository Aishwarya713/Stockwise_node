const { default: axios } = require('axios');
const { NEW_API_KEY } = require('../constant/constant');
var request = require('request');
const AlertMaster = require('../models/AlertMaster');
const AlertSubMaster = require('../models/AlertSubMaster');
const Alerts = require('../models/Alerts');

exports.getDashboard = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({
                message: "Body can not be empty!"
            });
        }

        let endpoints = [
            'https://financialmodelingprep.com/api/v3/stock_market/actives?apikey='+NEW_API_KEY,
            'https://financialmodelingprep.com/api/v3/stock_market/losers?apikey='+NEW_API_KEY,
            'https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey='+NEW_API_KEY,
        ];
        const axiosrequest1 = axios.get('https://financialmodelingprep.com/api/v3/stock/sectors-performance?apikey='+NEW_API_KEY);
        const axiosrequest2 = axios.get(endpoints[0]);
        const axiosrequest3 = axios.get(endpoints[1]);
        const axiosrequest4 = axios.get(endpoints[2]);
        
        await axios.all([axiosrequest1,axiosrequest2,axiosrequest3,axiosrequest4])
            .then(
                axios.spread(function(res1, res2, res3,res4) {
                    console.log(res2);
                    res.status(200).json({
                        error:false,
                        data:{
                            sectorPerformance:res1.data.sectorPerformance,
                            active:res2.data,
                            losers:res3.data,
                            gainers:res4.data,
                        },
                    })
                })
            )
            .catch((error)=>{
                res.status(500).json({
                    error:true,
                    message:error,
                })
            })
    } catch (error) {
        res.status(400).json({
            error:true,
            message:error.message,
        })
    }
};
exports.getStockInformation = async (req, res) => {
    try {
        const stockName = req.body.stockName
        let endpoints = "https://www.alphavantage.co/query?function=SMA&symbol="+stockName+"&interval=daily&time_period=10&series_type=open&apikey=0SPT4KSRSF77A5CO&datatype=json"
        
        request.get({
            url: endpoints,
            json: true,
            headers: {'User-Agent': 'request'}
        }, (err, response, data) => {
            if (err) {
                return res.status(400).json({
                    message: err,
                    error:true,
                });
            } else if (response.statusCode !== 200) {
                return res.status(400).json({
                    message: "something went wrong",
                    error:true,
                });
            } else {
                return res.status(200).json({
                    error:false,
                    data,
                })
            }
        });
        
            /* .then(function(response){
                
            }).catch((error)=>{
                res.status(500).json({
                    error:true,
                    message:error,
                })
            }) */
    } catch (error) {
        res.status(400).json({
            error:true,
            message:error.message,
        })
    }
};

exports.getAlertType = async (req, res) => {
    try {
        const [alerts] = await AlertMaster.getAlertType();
        if(alerts.length) {
            res.status(200).json({
                error:true,
                data:alerts,
            })
        } else {
            res.status(500).json({
                error:true,
                message:"alerts not available",
            })
        }
    } catch (error) {
        res.status(400).json({
            error:true,
            message:error.message,
        })
    }
};
exports.getSubAlertType = async (req, res) => {
    try {
        const alertTypeId = req.query.alertTypeId;
        const [alerts] = await AlertSubMaster.getSubAlertType(alertTypeId);
        if(alerts.length) {
            res.status(200).json({
                error:false,
                data:alerts,
            })
        } else {
            res.status(500).json({
                error:true,
                message:"alerts not available",
            })
        }
    } catch (error) {
        res.status(400).json({
            error:true,
            message:error.message,
        })
    }
};
exports.insertAlerts = async (req, res) => {
    try {
        if(!req.body) {
            res.status(400).send({
                message: "Body can not be empty!"
            });
        }
        const alertData = new Alerts({
            alert_type_id : req.body.alert_type_id,
            alert_type_sub_id : req.body.alert_type_sub_id,
            preference_data : req.body.preference_data,
            remarks : req.body.remarks,
        });
        const alerts = await Alerts.insertAlert(alertData);
        
         if(alerts[0].affectedRows) {
            res.status(201).json({
                error:false,
                data:"Alerts registered successfully",
            })
        } else {
            res.status(400).json({
                error:true,
                message:"something went wrong!!!",
            })
        }
    } catch (error) {
        res.status(400).json({
            error:true,
            message:error.message,
        })
    }
};
