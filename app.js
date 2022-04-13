const express = require("express");
const cron = require('node-cron');

const app = express();
var cors = require('cors');
app.use(cors());

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const morgan = require("morgan");
const bodyParser = require("body-parser");

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

const UserRoutes = require('./api/routes/UserRoute');
const SearchRoutes = require('./api/routes/SearchRoute');


/* app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
}) */
app.use('/api/v1/user/',UserRoutes);
app.use('/api/v1/search/',SearchRoutes);
app.use((req,res,next)=>{
    const error = new Error("Not Found here");
    error.status = 404;
    next(error);
})
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            error_code:error.status || 500,
            message:error.message
        }
    })
})
module.exports = app;