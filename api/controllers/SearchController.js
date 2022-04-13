var request = require('request');
const { API_KEY } = require('../constant/constant');


exports.searchStock = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({
                message: "Body can not be empty!"
            });
        }
        const keyword = req.query.keyword;
        var url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='+keyword+'&apikey='+API_KEY;

        request.get({
            url: url,
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
    } catch (error) {
        console.log("error",error);
        res.status(400).json({
            error:true,
            message:error.message,
        })
    }
};