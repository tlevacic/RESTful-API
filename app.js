const express = require('express');
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');
const mongoose= require('mongoose');

//IMPORT routes
const studentRoutes = require('./routes/students');

//Connect to mongoDb
mongoose.connect('mongodb+srv://dbUser:dbUserPassword@shop-o7wiq.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.use(morgan('dev')); //error handling
app.use(bodyParser.urlencoded({extended: false})); //for extracting body in incoming requests from FE
app.use(bodyParser.json()); //for extracting body in incoming requests whcih are in JSON from FE


//Setting headers
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); //from which url can api be accessed
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next(); //Go to next statement app.use(..)
});

//Routes
app.use('/students',studentRoutes);


//if route is not founded
app.use((req,res,next) =>{
    const error=new Error('Route not found');
    error.status(404);
    next(error); //Go to next app.use(..)
})

//if there is any errors
app.use((error,req,res,next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;